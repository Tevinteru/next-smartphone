import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';
import logger from '@/shared/lib/logger'; // 👈 импортируем логгер

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          logger.warn('[AUTH_LOGIN] Нет учетных данных');
          return null;
        }

        const values = { email: credentials.email };

        const findUser = await prisma.user.findFirst({ where: values });

        if (!findUser) {
          logger.warn(`[AUTH_LOGIN] Пользователь не найден: ${credentials.email}`);
          return null;
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          logger.warn(`[AUTH_LOGIN] Неверный пароль: ${credentials.email}`);
          return null;
        }

        logger.info(`[AUTH_LOGIN] Успешный вход: ${credentials.email}`);

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        if (!user.email) {
          logger.warn(`[AUTH_SIGNIN] Нет email у пользователя`);
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: { email: user.email },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {},
          });

          logger.info(`[AUTH_SIGNIN] Пользователь найден и обновлён: ${user.email}`);
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
          },
        });

        logger.info(`[AUTH_SIGNIN] Новый пользователь создан: ${user.email}`);
        return true;
      } catch (error) {
        logger.error(`[AUTH_SIGNIN] Ошибка входа: ${error instanceof Error ? error.message : error}`);
        return false;
      }
    },

    async jwt({ token }) {
      if (!token.email) return token;

      const findUser = await prisma.user.findFirst({
        where: { email: token.email },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },

    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
