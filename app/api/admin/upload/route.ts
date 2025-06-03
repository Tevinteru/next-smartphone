import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
  }

  // Генерируем имя файла
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

  try {
    // Загружаем в Vercel Blob, делаем доступ публичным
    const blob = await put(filename, file.stream(), {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json({ imageUrl: blob.url }, { status: 200 });
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 });
  }
}
