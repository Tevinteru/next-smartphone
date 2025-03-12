'use client';

import { useState } from 'react';
import { useUserStore } from '@/shared/store/admin/user';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/shared/components/ui/select';
import { Title } from '@/shared/components';

export default function CreateUserPage() {
  const { addUser } = useUserStore();
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'USER', // роль по умолчанию
  });

  const handleCreate = () => {
    addUser(newUser); // передаем данные пользователя в store
    router.push('/admin/users'); // редиректим на страницу пользователей
  };

  return (
    <div className="p-6">
      <Title size='xl' text='Добавить пользователя' className="text-2xl font-bold pb-6" />
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Полное имя"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          className='md:text-lg'
        />
        <Input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className='md:text-lg'

        />
        <Input
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          className='md:text-lg'
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <Select
          value={newUser.role}
          onValueChange={(value) => setNewUser({ ...newUser, role: value })}
        >
          <SelectTrigger className="border p-2 w-full">
          <span className='md:text-lg'>{newUser.role === 'USER' ? 'Пользователь' : 'Администратор'}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">Пользователь</SelectItem>
            <SelectItem value="ADMIN">Администратор</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleCreate}>Создать</Button>
      </div>
    </div>
  );
}
