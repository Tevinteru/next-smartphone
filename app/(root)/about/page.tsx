import React from 'react';
import { Button, Title } from '@/shared/components'; // Кнопки из shadcn/ui или Radix

import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      {/* Заголовок */}
      <Title size="lg" text="О нас" className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-12" />
      
      {/* Введение */}
      <div className="text-center mb-16">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Мы — команда энтузиастов, работающих над созданием инновационных решений для наших клиентов. Наша миссия — приносить радость и удобство каждому, кто с нами взаимодействует.
        </p>
      </div>

      {/* Галерея */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="group relative">
          <Image
            src="/images/team1.jpg"
            alt="Команда 1"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Наша команда
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/team2.jpg"
            alt="Команда 2"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Креативный процесс
          </div>
        </div>

        <div className="group relative">
          <Image
            src="/images/team3.jpg"
            alt="Команда 3"
            width={400}
            height={300}
            className="rounded-xl object-cover transition-transform transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-lg p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity">
            Вдохновляющая атмосфера
          </div>
        </div>
      </div>

      {/* Кнопка CTA */}
      <div className="text-center mt-12">
        <Button variant="outline" className="px-8 py-4 text-xl border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
          Узнать больше
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
