'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DropdownValueType, ModularFormField, ModularFormFieldType } from './ModularForm/modular-form-types';
import { ModularForm } from './ModularForm/ModularForm';
import { POSITION_IDS, PositionEnum } from '@/constants/positions';
import { updateEmployeeInfo } from '@/server/actions/users/updateEmployee';

const positions: DropdownValueType[] = Object.values(PositionEnum).map((pos: PositionEnum) => ({
  label: pos,
  value: POSITION_IDS[pos],
}));

const fields: ModularFormField[] = [
  {
    type: ModularFormFieldType.Text,
    label: 'ФИО',
    name: 'fio',
  },
  {
    type: ModularFormFieldType.Text,
    label: 'Телефон',
    name: 'phone',
  },
  {
    type: ModularFormFieldType.Text,
    label: 'Адрес',
    name: 'address',
  },
  {
    type: ModularFormFieldType.Text,
    label: 'Паспорт',
    name: 'passport',
  },
  {
    type: ModularFormFieldType.Dropdown,
    label: 'Должность',
    name: 'positionId',
    values: positions,
  },
];

interface UpdateEmployeeFormProps {
  employeeId: string | null;
  initialData: {
    fio: string;
    phone: string;
    address: string;
    passport: string;
    positionId: string;
  } | null;
}

export function UpdateEmployeeForm({ employeeId, initialData }: UpdateEmployeeFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fio: '',
    phone: '',
    address: '',
    passport: '',
    positionId: '',
  } as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData)
      setFormData({
        fio: initialData.fio,
        phone: initialData.phone,
        address: initialData.address,
        passport: initialData.passport,
        positionId: initialData.positionId,
      });
  }, [initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!employeeId) {
        return;
      }

      const result = await updateEmployeeInfo(employeeId, {
        fio: formData.fio,
        phone: formData.phone,
        address: formData.address,
        passport: formData.passport,
        positionId: formData.positionId,
      });

      if (result && 'error' in result) {
        setError('Ошибка при обновлении данных сотрудника');
      } else {
        router.refresh();
      }
    } catch (err) {
      setError('Произошла непредвиденная ошибка');
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
        title="Редактировать сотрудника"
        triggerLabel="Редактировать"
        onSubmit={handleSubmit}
      />
      {loading && <p>Обновление данных сотрудника...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
