import { FindEmployeeForm } from '@/components/employees/FindEmployeesForm';
import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { Input } from '@/components/ui/input';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '@/components/ui/table';
import { getEmployees } from '@/server/actions/users/getEmployees';
import Link from 'next/link';

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
      <FindEmployeeForm />
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
                <Link href={`/employees/${user.id}`}>{user.phone}</Link>
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
