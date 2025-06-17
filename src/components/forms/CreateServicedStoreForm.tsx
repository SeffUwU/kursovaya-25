'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModularFormField, ModularFormFieldType } from './CreateForm/create-form-types';
import { ModularCreateForm } from './CreateForm/CreateForm';
import { createStore } from '@/server/actions/stores/createStore';

export function CreateServicedStore() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
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

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createStore(formData);

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
      <ModularCreateForm
        fields={fields}
        formData={formData}
        onFormDataChange={setFormData}
        title="Добавить обслуживаемый магазин"
        triggerLabel="Новый магазин"
        onSubmit={handleSubmit}
      />
      {loading && <p>Создание магазина...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
