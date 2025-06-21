'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ModularFormField, ModularFormFieldType } from './ModularForm/modular-form-types';
import { ModularForm } from './ModularForm/ModularForm';
import { updatePart } from '@/server/actions/parts/updatePart';

interface UpdateRepairedPartProps {
  partId: string;
  initialData: {
    name: string;
    varchar: string;
    price: number;
  };
}

export function UpdateRepairedPart({ partId, initialData }: UpdateRepairedPartProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name,
    varchar: initialData.varchar,
    price: initialData.price,
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

  // Update form when initialData changes
  useEffect(() => {
    setFormData({
      name: initialData.name,
      varchar: initialData.varchar,
      price: initialData.price,
    } as any);
  }, [initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await updatePart(partId, formData);

      if ('is_error' in response && response.is_error) {
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
        title="Редактировать деталь"
        triggerLabel="Редактировать"
        onSubmit={handleSubmit}
      />
      {loading && <p>Сохранение изменений...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
