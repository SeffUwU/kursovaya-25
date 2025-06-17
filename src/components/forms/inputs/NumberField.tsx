import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, FocusEvent, forwardRef } from 'react';

export interface NumberFieldProps {
  name: string;
  label?: string;
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: number | undefined, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      name,
      label,
      value,
      defaultValue,
      placeholder,
      min,
      max,
      step,
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
      const rawValue = event.target.value;
      const numValue = rawValue === '' ? undefined : Number(rawValue);
      onChange?.(numValue, event);
    };

    // Convert undefined/null to empty string for controlled input
    const inputValue = value === undefined ? '' : value;

    return (
      <div className={`grid w-full gap-1.5 ${className}`}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Input
          ref={ref}
          id={name}
          name={name}
          type="number"
          value={inputValue}
          defaultValue={defaultValue}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
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

NumberField.displayName = 'NumberField';
