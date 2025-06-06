import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CountIconButton } from './count-icon-button';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onClick?: (type: 'plus' | 'minus') => void;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
        
      <div>
        <CountIconButton
          onClick={() => onClick?.('minus')}
          disabled={value === 1}
          size={size}
          type="minus"
        />
      </div>
      

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
      <div>
        <CountIconButton onClick={() => onClick?.('plus')} size={size} type="plus"/>
      </div>
    </div>
  );
};
