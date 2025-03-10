'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUserStore } from '@/shared/store/admin/user';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { Title } from '@/shared/components';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { users, updateUser } = useUserStore();
  
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'USER', // default role
  });

  useEffect(() => {
    const userToEdit = users.find((user) => user.id === Number(id));
    if (userToEdit) {
      setUser({
        fullName: userToEdit.fullName,
        email: userToEdit.email,
        password: '', // оставляем поле пароля пустым при редактировании
        role: userToEdit.role,
      });
    }
  }, [users, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(Number(id), user);
    router.push('/admin/users'); // перенаправляем на страницу пользователей после обновления
  };

  return (
    <div className="p-6">
      <Title size='xl' text='Редактировать пользователя' className="text-2xl font-bold pb-6" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="block text-xl font-medium text-gray-700 mb-2">
            Полное имя:
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Полное имя"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            className="border md:text-lg p-2 w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="block text-xl font-medium text-gray-700 mb-2">
            Email:
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border md:text-lg p-2 w-full"
          />
        </div>

        <div>
          <Label htmlFor="password" className="block text-xl font-medium text-gray-700 mb-2">
            Пароль (оставьте пустым, если не хотите менять):
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Пароль"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border md:text-lg p-2 w-full"
          />
        </div>

        <div>
          <Label htmlFor="role" className="block text-xl font-medium text-gray-700 mb-2">
            Роль:
          </Label>
          <Select
            value={user.role}
            onValueChange={(value) => setUser({ ...user, role: value })}
          >
            <SelectTrigger>
              <span className='md:text-lg'>{user.role === 'USER' ? 'Пользователь' : 'Администратор'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">Пользователь</SelectItem>
              <SelectItem value="ADMIN">Администратор</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className='md:text-lg' type="submit">Сохранить</Button>
      </form>
    </div>
  );
}
