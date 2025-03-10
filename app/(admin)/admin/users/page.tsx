'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/shared/store/admin/user';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import Link from 'next/link';
import { Title } from '@/shared/components';

export default function UsersPage() {
  const { users, fetchUsers, deleteUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      await deleteUser(id);
    }
  };

  return (
    <div className="p-6">
      <Title size='xl' text='Список пользователей' className="text-2xl font-bold pb-6" />
      <Link href="/admin/users/create">
        <Button className="mb-4 text-lg">Добавить нового пользователя</Button>
      </Link>
      <Table className="text-xl mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/users/edit/${user.id}`}>
                    <Button variant="outline" size="icon">✏️</Button>
                  </Link>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>🗑</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
