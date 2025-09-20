import * as React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full rounded-md px-3 py-2 text-base md:text-sm transition-colors border shadow-sm outline-none',
        'bg-white text-gray-900 placeholder-gray-400', // fondo blanco sólido y placeholder gris
        'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300',
        'dark:bg-input/30 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-500/40',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'aria-invalid:border-red-500 aria-invalid:ring-red-200',
        className
      )}
      {...props}
    />
  );
}

export { Input };
