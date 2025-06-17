import { ModuleSearchBar } from '@/components/employees/FindEmployeesForm';
import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPhone } from '@/lib/format.utils';
import { getStores } from '@/server/actions/stores/getStores';
import Link from 'next/link';

type Type = NonNullable<NonNullable<Parameters<typeof getStores>['0']>['type']>;

const filters: { value: Type; name: string }[] = [
  { value: 'name', name: 'Наименование' },
  { value: 'phone', name: 'Телефон' },
  { value: 'address', name: 'Адрес' },
];

export default async function UsersPage({ searchParams }: any) {
  const { query, type } = await searchParams;
  const stores = await getStores({
    query,
    type,
    page: 0,
    take: 200,
  });

  if (stores.is_error) {
    return <ErrorComponent title="Ошибка при поиске магазинов" />;
  }

  return (
    <div className="p-4">
      <HeaderInfo title={'Список сотрудников'} type="employee" />
      <ModuleSearchBar defaultFilter="position" filter={filters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Наименование</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Адрес</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.value.map((store) => (
            <TableRow key={store.id}>
              <TableCell>
                <Link href={`/store/${store.id}`}>{store.name}</Link>
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/store/${store.id}`}>{formatPhone(store.phone)}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/store/${store.id}`}>{store.address}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
