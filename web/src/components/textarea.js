import React from 'react';

// Función simple para concatenar clases condicionalmente
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full min-h-24 rounded-lg border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-md transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
