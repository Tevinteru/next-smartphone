import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className
      )}
    >
      {/* Смещаем картинку влево */}
      <img
        src={imageUrl}
        alt="Product"
        className={cn(
          "relative left-1 z-10 w-[400px] h-[400px]"
        )}
      />
      {/* Рамка с тенью и закругленными углами */}
    </div>
  );
};
