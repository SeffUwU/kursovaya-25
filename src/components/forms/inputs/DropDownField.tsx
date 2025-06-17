import { Label } from '@/components/ui/label';
import { forwardRef } from 'react';
import { DropdownValueType } from '../CreateForm/create-form-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface DropdownFieldProps {
  name: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  values: DropdownValueType[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const DropdownField = forwardRef<HTMLButtonElement, DropdownFieldProps>(
  (
    {
      name,
      label,
      value,
      defaultValue,
      placeholder = 'Select an option',
      values,
      disabled = false,
      required = false,
      className = '',
      onChange,
      onBlur,
      onFocus,
    },
    ref,
  ) => {
    return (
      <div className={`grid w-full gap-1.5 ${className}`}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Select
          value={value}
          defaultValue={defaultValue}
          onValueChange={onChange}
          disabled={disabled}
          required={required}
          name={name}
        >
          <SelectTrigger ref={ref} id={name} onBlur={onBlur} onFocus={onFocus} aria-required={required}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {values.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
);

DropdownField.displayName = 'DropdownField';
