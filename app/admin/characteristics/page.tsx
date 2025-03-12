'use client';

import { useEffect } from 'react';
import { useCharacteristicStore } from '@/shared/store/admin/characteristic';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import Link from 'next/link';
import { Title } from '@/shared/components';

interface CharacteristicType {
  id: number; 
  characteristic: string; 
  value: string; 
  categoryId: number;
}

export default function CharacteristicsPage() {
  const { characteristics, fetchCharacteristics, deleteCharacteristic } = useCharacteristicStore();

  useEffect(() => {
    fetchCharacteristics();
  }, [fetchCharacteristics]);

  return (
    <div className="p-6">
      <Title size='xl' text='Характеристики' className="text-2xl font-bold pb-6" />
      <Link href="/admin/characteristics/create">
        <Button className="text-lg">Добавить характеристику</Button>
      </Link>
      <Table className="text-lg mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Значение</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {characteristics.map((char: CharacteristicType) => (
            <TableRow key={char.id}>
              <TableCell>{char.id}</TableCell>
              <TableCell>{char.characteristic}</TableCell>
              <TableCell>{char.value}</TableCell>
              <TableCell>{char.categoryId}</TableCell>
              <TableCell>
                <Link href={`/admin/characteristics/edit/${char.id}`} className="mr-2">
                  <Button variant="outline" size="icon">✏️</Button>
                </Link>
                <Button variant="destructive" size="icon" onClick={() => deleteCharacteristic(char.id)}>🗑</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
