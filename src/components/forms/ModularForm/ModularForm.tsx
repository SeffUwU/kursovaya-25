'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ModularFormField, ModularFormFieldType } from './modular-form-types';
import { FormEvent, useState } from 'react';
import { TextField } from '../inputs/TextField';
import { NumberField } from '../inputs/NumberField';
import { DropdownField } from '../inputs/DropDownField';

export interface ModularCreateFormProps {
  fields: ModularFormField[];
  formData: Record<string, any>;
  onFormDataChange: (newData: Record<string, any>) => void;
  title?: string;
  triggerLabel?: string;
  onSubmit: () => void;
  controlled?: {
    open: boolean;
    setOpen: (arg0: boolean) => void;
  };
}

export function ModularForm({
  fields,
  formData,
  onFormDataChange,
  title = 'Создать',
  triggerLabel = 'Создать',
  onSubmit,
  controlled,
}: ModularCreateFormProps) {
  const [open, setOpen] = useState(false);

  const handleFieldChange = (fieldName: string, value: any) => {
    onFormDataChange({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onSubmit();
  };

  const renderField = (field: ModularFormField) => {
    switch (field.type) {
      case ModularFormFieldType.Text:
        return (
          <TextField
            id={field.name}
            label={field.label}
            value={formData?.[field.name] || ''}
            onChange={(value: any) => handleFieldChange(field.name, value)}
          />
        );
      case ModularFormFieldType.Number:
        return (
          <NumberField
            name={field.name}
            label={field.label}
            value={formData?.[field.name]}
            min={field.min}
            max={field.max}
            onChange={(value: any) => handleFieldChange(field.name, value)}
          />
        );
      case ModularFormFieldType.Dropdown:
        return (
          <DropdownField
            name={field.name}
            label={field.label}
            value={formData?.[field.name]}
            values={field.values}
            onChange={(value) => handleFieldChange(field.name, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={controlled?.open ?? open} onOpenChange={controlled?.setOpen ?? setOpen}>
      {controlled ? null : (
        <DialogTrigger asChild>
          <Button className="absolute right-16 bottom-12 gap-1 pr-4 z-10">
            <Plus size={16} />
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={field.name}>{renderField(field)}</div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
