'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModularFormField, ModularFormFieldType } from './ModularForm/modular-form-types';
import { ModularForm } from './ModularForm/ModularForm';
import { createPart } from '@/server/actions/parts/createPart';

export function CreateRepairedPart() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    varchar: '',
    price: 0,
  } as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields: ModularFormField[] = [
    {
      type: ModularFormFieldType.Text,
      label: 'Наименование',
      name: 'name',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Описание',
      name: 'varchar',
    },
    {
      type: ModularFormFieldType.Number,
      label: 'Цена',
      name: 'price',
    },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createPart(formData);

      if (response.is_error) {
        throw new Error(response.message);
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла непредвиденная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModularForm
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
