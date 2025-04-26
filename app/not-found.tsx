import { Header } from '@/shared/components';
import { InfoBlock } from '@/shared/components/shared/info-block';
import { Suspense } from 'react';

export default function NotFoundPage() {
  return (
    <>
     <Suspense>
        <Header />
      </Suspense>
    <div className="flex flex-col items-center justify-center md:mt-40 mt-30">
      <InfoBlock
        title="Страница не найдена"
        text="Проверьте корректность введённого адреса или повторите попытку позже"
        imageUrl="/assets/images/not-found.png"
      />
    </div>
    </>
  );
}