import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'images', 'product', fileName);

    await writeFile(filePath, buffer);
    
    return NextResponse.json({ imageUrl: `/images/product/${fileName}` }, { status: 200 });
  } catch {
    return NextResponse.json({ err: 'Ошибка загрузки' }, { status: 500 });
  }
}
