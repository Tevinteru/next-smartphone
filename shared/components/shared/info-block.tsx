import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import Link from 'next/link';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div
      className={cn(
        className,
        'flex flex-col lg:flex-row items-center justify-between max-w-screen-lg mx-auto px-4 lg:px-0 gap-8 lg:gap-12 mt-12' // Добавлен mt-12 для отступа сверху
      )}
    >
      <div className="flex flex-col w-full lg:w-[445px]">
        <div className="w-full mb-6">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 mt-6 lg:mt-8">
          <Link href="/">
            <Button variant="outline" className="gap-2 w-full lg:w-auto">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50 w-full lg:w-auto">
              Обновить
            </Button>
          </a>
        </div>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="mt-6 lg:mt-0 w-full lg:w-[300px] object-cover rounded-lg"
        />
      )}
    </div>
  );
};
