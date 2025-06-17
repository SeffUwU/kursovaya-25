import { ModuleSearchBar } from '@/components/employees/FindEmployeesForm';
import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPhone } from '@/lib/format.utils';
import { getEmployees } from '@/server/actions/users/getEmployees';
import Link from 'next/link';

const filters = [
  { value: 'fio', name: 'ФИО' },
  { value: 'phone', name: 'Телефон' },
  { value: 'position', name: 'Должность' },
];

export default async function UsersPage({ searchParams }: any) {
  const { query, type } = await searchParams;
  const users = await getEmployees({
    query,
    type,
    page: 0,
    take: 200,
  });

  if (users.is_error) {
    return <ErrorComponent title="Ошибка при поиске пользователей" />;
  }

  return (
    <div className="p-4">
      <HeaderInfo title={'Список сотрудников'} type="employee" />
      <ModuleSearchBar defaultFilter="position" filter={filters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Телефон</TableHead>
            <TableHead>ФИО</TableHead>
            <TableHead>Должность</TableHead>
            <TableHead className="text-right">Заработная плата</TableHead>
            <TableHead className="text-right">Дата рождения</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.value.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <Link href={`/employees/${user.id}`}>{formatPhone(user.phone)}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/employees/${user.id}`}>{user.fio}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/employees/${user.id}`}>{user.position.name}</Link>
              </TableCell>
              <TableCell className="text-right">{user.position.salary} RUB</TableCell>
              <TableCell className="text-right">{user.dob?.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
