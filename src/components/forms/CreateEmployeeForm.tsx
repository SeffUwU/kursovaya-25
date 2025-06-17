'use client';

import { signup } from '@/server/actions/auth/signup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DropdownValueType, ModularFormField, ModularFormFieldType } from './CreateForm/create-form-types';
import { ModularCreateForm } from './CreateForm/CreateForm';
import { POSITION_IDS, PositionEnum } from '@/constants/positions';

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
    type: ModularFormFieldType.Text,
    label: 'Пароль',
    name: 'password',
  },
  {
    type: ModularFormFieldType.Dropdown,
    label: 'Должность',
    name: 'positionId',
    values: positions,
  },
];

export function CreateEmployeeForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fio: '',
    phone: '',
    address: '',
    passport: '',
    password: '',
    positionId: '',
  } as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signup({
        login: formData.phone,
        fio: formData.fio,
        address: formData.address,
        password: formData.password,
        passport: formData.passport,
        positionId: formData.positionId,
      });

      if (result && 'error' in result) {
        setError('Ошибка при создании сотрудника');
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
      <ModularCreateForm
        fields={fields}
        formData={formData}
        onFormDataChange={setFormData}
        title="Создать сотрудника"
        triggerLabel="Новый сотрудник"
        onSubmit={handleSubmit}
      />
      {loading && <p>Создание сотрудника...</p>}
      {error && <div className="text-red-500 p-2 rounded bg-red-50 mt-2">{error}</div>}
    </>
  );
}
