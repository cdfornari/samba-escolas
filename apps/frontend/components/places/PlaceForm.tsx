'use client';
import { Input } from '@nextui-org/react';

export const PlaceForm = () => {
  return (
    <div className="w-full h-full py-10 px-[25%] flex flex-col gap-4 justify-center">
      <Input labelPlaceholder="Nombre" clearable />
      
    </div>
  );
};
