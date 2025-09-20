import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Select(props) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props) {
  return <SelectPrimitive.Value {...props} />;
}

function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex items-center justify-between w-full rounded-md border px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 shadow-xs outline-none', // fondo blanco sólido
        'focus:border-blue-500 focus:ring focus:ring-blue-300 dark:bg-input/30 dark:text-gray-100 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-500/50',
        'hover:border-blue-400 dark:hover:border-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="w-4 h-4 opacity-70" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'bg-white dark:bg-input/30 text-gray-900 dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden', // fondo blanco sólido
          'max-h-60 overflow-y-auto',
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex items-center px-2 py-2 text-sm rounded-md cursor-pointer select-none outline-none',
        'hover:bg-blue-100 dark:hover:bg-blue-500/30 focus:bg-blue-200 dark:focus:bg-blue-500/40',
        'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none transition-colors duration-150',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center">
        <CheckIcon className="w-4 h-4 text-blue-500" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      className={cn('px-2 py-1 text-xs text-gray-500 dark:text-gray-400 font-semibold', className)}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }) {
  return <SelectPrimitive.Separator className={cn('h-px bg-gray-300 dark:bg-gray-600 my-1', className)} {...props} />;
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton className={cn('flex items-center justify-center p-1', className)} {...props}>
      <ChevronUpIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton className={cn('flex items-center justify-center p-1', className)} {...props}>
      <ChevronDownIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
