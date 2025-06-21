import { ModuleSearchBar } from '@/components/employees/FindEmployeesForm';
import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { CreateOrderPopup } from '@/components/forms/CreateOrder';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getOrders } from '@/server/actions/orders/getOrders';
import Link from 'next/link';

// const filters = [
//   { name: 'ФИО клиента', value: 'customerFio' },
//   { name: 'Серийный номер', value: 'serial' },
//   { name: 'Гарантийный талон', value: 'guaranteeNote' },
// ];

export default async function OrdersPage({ searchParams }: any) {
  // const { query, type, servicedStoreId, dateFrom, dateTo } = await searchParams;
  const orders = await getOrders({
    page: 0,
    take: 200,
  });

  if (orders.is_error) {
    return <ErrorComponent title="Ошибка при поиске заказов" />;
  }
  return (
    <div className="p-4">
      <HeaderInfo title={'Список заказов'} type="employee" />
      <CreateOrderPopup />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата заказа</TableHead>
            <TableHead>ФИО клиента</TableHead>
            <TableHead>Серийный номер</TableHead>
            <TableHead>Магазин</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.value.map((val) => {
            const order = val.orders;
            const store = val.serviced_stores!;

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/orders/${order.id}`}>{new Date(order.orderDate).toDateString()}</Link>
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/orders/${order.id}`}>{order.customerFio}</Link>
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`}>{order.serial}</Link>
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`}>{store.name || 'Не указан'}</Link>
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`}>{order.price} ₽</Link>
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`}>{order.returnDate ? 'Завершен' : 'В работе'}</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
