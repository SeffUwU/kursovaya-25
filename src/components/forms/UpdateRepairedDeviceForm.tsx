'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ModularFormField, ModularFormFieldType } from './ModularForm/modular-form-types';
import { ModularForm } from './ModularForm/ModularForm';
import { IRepairedDevice } from '@/entities';
import { updateRepairedDevice } from '@/server/actions/repaired-devices/updateDevice';

interface UpdateRepairedDeviceProps {
  deviceId: string;
  initialData: IRepairedDevice;
}

export function UpdateRepairedDevice({ deviceId, initialData }: UpdateRepairedDeviceProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<IRepairedDevice>>(initialData);
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
      label: 'Тип устройства',
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
      label: 'Комплектация',
      name: 'details',
    },
  ];

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateRepairedDevice(deviceId, formData);

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
        title="Редактировать устройство"
        triggerLabel="Редактировать"
        onSubmit={handleSubmit}
      />
      {loading && <p>Сохранение изменений...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
