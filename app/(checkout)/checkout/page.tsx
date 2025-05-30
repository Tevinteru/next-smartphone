'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '@/shared/components';
import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';
import { AuthProtectedForm } from '@/shared/components';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session, form]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      if (!session) {
        toast.error('Для оформления заказа необходимо авторизоваться', {
          icon: '🔒',
        });
        return;
      }
      setSubmitting(true);

      const success = await createOrder(data);

      if (success) {
        toast.success('Заказ успешно оформлен!', {
          icon: '✅',
        });
        router.push('/catalog');
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <AuthProtectedForm>
                <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
              </AuthProtectedForm>

              <AuthProtectedForm>
                <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
              </AuthProtectedForm>
            </div>

            {/* Правая часть */}
            <div className="w-full md:w-[450px]">
              <CheckoutSidebar 
                totalAmount={totalAmount} 
                loading={loading || submitting} 
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}