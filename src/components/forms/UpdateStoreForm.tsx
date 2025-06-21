'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ModularFormField, ModularFormFieldType } from './ModularForm/modular-form-types';
import { ModularForm } from './ModularForm/ModularForm';
import { updateStore } from '@/server/actions/stores/updateStore';

interface UpdateServicedStoreProps {
  storeId: string;
  initialData: {
    name: string;
    address: string;
    phone: string;
  };
}

export function UpdateServicedStore({ storeId, initialData }: UpdateServicedStoreProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name,
    address: initialData.address,
    phone: initialData.phone,
  } as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields: ModularFormField[] = [
    {
      type: ModularFormFieldType.Text,
      label: 'Название магазина',
      name: 'name',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Адрес',
      name: 'address',
    },
    {
      type: ModularFormFieldType.Text,
      label: 'Телефон',
      name: 'phone',
    },
  ];

  useEffect(() => {
    setFormData({
      name: initialData.name,
      address: initialData.address,
      phone: initialData.phone,
    });
  }, [initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateStore(storeId, formData);

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
        title="Редактировать магазин"
        triggerLabel="Редактировать"
        onSubmit={handleSubmit}
      />
      {loading && <p>Сохранение изменений...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
