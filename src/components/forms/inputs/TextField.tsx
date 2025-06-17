import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, FocusEvent, forwardRef } from 'react';

export interface TextFieldProps {
  id: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      value,
      defaultValue,
      placeholder,
      type = 'text',
      disabled = false,
      required = false,
      className = '',
      onChange,
      onBlur,
      onFocus,
    },
    ref,
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value, event);
    };

    return (
      <div className={`grid w-full gap-1.5 ${className}`}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input
          ref={ref}
          id={id}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    );
  },
);

TextField.displayName = 'TextField';
