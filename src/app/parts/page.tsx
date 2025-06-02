import { ModuleSearchBar } from '@/components/employees/FindEmployeesForm';
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
import { getParts } from '@/server/actions/parts/getParts';
import Link from 'next/link';
const filters = [
  { name: 'Наименование', value: 'name' },
  { name: 'Описание', value: 'varchar' },
];
export default async function UsersPage({ searchParams }: any) {
  const { query, type } = await searchParams;
  const parts = await getParts({
    query,
    type,
    page: 0,
    take: 200,
  });

  if (parts.is_error) {
    return <ErrorComponent title="Ошибка при поиске деталей" />;
  }

  return (
    <div className="p-4">
      <HeaderInfo title={'Список деталей'} type="part" />
      <ModuleSearchBar defaultFilter="name" filter={filters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Наименование</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Описание</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.value.map((part) => (
            <TableRow key={part.id}>
              <TableCell className="font-medium">
                <Link href={`/parts/${part.id}`}>{part.name}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/parts/${part.id}`}>{part.price}</Link>
              </TableCell>
              <TableCell>
                <Link href={`/parts/${part.id}`}>{part.varchar}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
