'use client';

import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';

export function FindEmployeeForm() {
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('position');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // debounce this action
    const debouncer = setTimeout(() => {
      const url = new URL(window.location.origin + pathname);

      if (query) {
        url.searchParams.set('query', query);
        url.searchParams.set('type', select);
      }

      router.push(url.toString());
    }, 750);

    return () => clearTimeout(debouncer);
  }, [query, select]);

  return (
    <div className="flex flex-row gap-4 items-center">
      <span>Поиск </span>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xl" />
      <span>ПО:</span>
      <select className="p-2 rounded-md bg-gray-100" value={select} onChange={(e) => setSelect(e.target.value)}>
        <option value="fio">ФИО</option>
        <option value="phone">Телефону</option>
        <option value="position">Должности</option>
      </select>
    </div>
  );
}
