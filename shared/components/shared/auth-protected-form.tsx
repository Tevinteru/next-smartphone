'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

export const AuthProtectedForm: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { data: session } = useSession();

  return (
    <div className={`relative ${className}`}>
      {children}
      {!session && (
        <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center backdrop-blur-[2px] rounded-lg z-10">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <p className="font-medium">Для продолжения необходимо авторизоваться</p>
          </div>
        </div>
      )}
    </div>
  );
};