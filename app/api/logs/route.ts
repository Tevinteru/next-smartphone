import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getUserSession } from '@/shared/lib/get-user-session';

// Путь к логам
const logDir = path.resolve(process.cwd(), 'logs');
const combinedLogPath = path.join(logDir, 'combined.log');

export async function GET() {
  const session = await getUserSession();

  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const logs = fs.readFileSync(combinedLogPath, 'utf-8');
    const lines = logs.trim().split('\n').slice(-100).reverse(); // последние 100 строк
    return NextResponse.json({ logs: lines });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read log file ' + err }, { status: 500 });
  }
}
