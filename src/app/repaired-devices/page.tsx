import { ModuleSearchBar } from '@/components/employees/FindEmployeesForm';
import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { CreateRepairedDeviceForm } from '@/components/forms/CreateRepairedDeviceForm';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getRepairedDevice } from '@/server/actions/repaired-devices/getRepairedDevices';
import { getStores } from '@/server/actions/stores/getStores';
import Link from 'next/link';

type Type = NonNullable<NonNullable<Parameters<typeof getRepairedDevice>['0']>['type']>;

const filters: { value: Type; name: string }[] = [
  { value: 'name', name: 'Наименование' },
  { value: 'type', name: 'Тип' },
  { value: 'manufacturer', name: 'Производитель' },
  { value: 'characteristics', name: 'Характеристики' },
  { value: 'details', name: 'Детали' },
];

export default async function UsersPage({ searchParams }: any) {
  const { query, type } = await searchParams;
  const devices = await getRepairedDevice({
    query,
    type,
    page: 0,
    take: 200,
  });

  if (devices.is_error) {
    return <ErrorComponent title="Ошибка при поиске магазинов" />;
  }

  return (
    <div className="p-4">
      <HeaderInfo title={'Список моделей'} type="part" />
      <ModuleSearchBar defaultFilter="position" filter={filters} />
      <CreateRepairedDeviceForm />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Наименование</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Производитель</TableHead>
            <TableHead>Характеристики</TableHead>
            <TableHead>Детали</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.value.map((store) => (
            <TableRow key={store.id}>
              <TableCell>
                <Link href={`/repaired-devices/${store.id}`}>{store.name}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/repaired-devices/${store.id}`}>{store.type}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/repaired-devices/${store.id}`}>{store.manufacturer}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/repaired-devices/${store.id}`}>{store.characteristics}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/repaired-devices/${store.id}`}>{store.details}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
