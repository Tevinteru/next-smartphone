import { InfoBlock } from '@/shared/components';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
