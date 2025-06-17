'use client';

import { ModularFormField, ModularFormFieldType } from './CreateForm/create-form-types';
import { ModularCreateForm } from './CreateForm/CreateForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRepairedDevice } from '@/server/actions/repaired-devices/createRepairedDevice';
import { useToast } from '@/hooks/use-toast';

export function CreateRepairedDeviceForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    manufacturer: '',
    characteristics: '',
    details: '',
  } as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const fields: ModularFormField[] = [
    {
      type: ModularFormFieldType.Text,
      label: 'Наименование',
      name: 'name',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Тип',
      name: 'type',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Производитель',
      name: 'manufacturer',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Характеристики',
      name: 'characteristics',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Детали',
      name: 'details',
    },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createRepairedDevice(formData);

      if (response.is_error) {
        throw new Error(response.message);
      }

      router.refresh();
    } catch (err) {
      toast.toast({
        title: 'Ошибка!',
        variant: 'destructive',
        description: err instanceof Error ? err.message : 'Произошла непредвиденная ошибка',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModularCreateForm
        fields={fields}
        formData={formData}
        onFormDataChange={setFormData}
        title="Добавить ремонтируемую деталь"
        triggerLabel="Новая деталь"
        onSubmit={handleSubmit}
      />
      {loading && <p>Создание записи...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
