import { UpdateOrderPopup } from '@/components/forms/UpdateOrderForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getOrderById } from '@/server/actions/orders/getOrder';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderResult = await getOrderById((await params).id);

  if (orderResult.is_error || !orderResult.value) {
    return notFound();
  }

  const order = orderResult.value[0].orders;
  const servicedStore = orderResult.value[0].serviced_stores;
  const malfunction = orderResult.value[0].malfunctions;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <UpdateOrderPopup order={order} />
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">ID Заказа</TableCell>
                  <TableCell>{order.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ФИО клиента</TableCell>
                  <TableCell>{order.customerFio}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Серийный номер</TableCell>
                  <TableCell>{order.serial}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Номер заказа</TableCell>
                  <TableCell>{new Date(order.orderDate).toDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Дата завершения</TableCell>
                  <TableCell>
                    {order.returnDate ? new Date(order.returnDate).toDateString() : 'Еще в работе..'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Статус</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.returnDate ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.returnDate ? 'Завершен' : 'В работе'}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Цена</TableCell>
                  <TableCell>{order.price}₽</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Гарантийный талон</TableCell>
                  <TableCell>{order.guaranteeNote || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Дата гарантии</TableCell>
                  <TableCell>
                    {order.guaranteeEndDate ? new Date(order.guaranteeEndDate).toDateString() : 'N/A'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Магазин</CardTitle>
            </CardHeader>
            <CardContent>
              {servicedStore ? (
                <div className="space-y-2">
                  <p className="font-medium">{servicedStore.name}</p>
                  <p>{servicedStore.address}</p>
                  <p>Phone: {servicedStore.phone}</p>
                </div>
              ) : (
                <p>Информация по магазину не найдена.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Детали поломки</CardTitle>
            </CardHeader>
            <CardContent>
              {malfunction ? (
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Описание</p>
                    <p>{malfunction.description}</p>
                  </div>
                  <div>
                    <p className="font-medium">Симптомы</p>
                    <p>{malfunction.symptoms}</p>
                  </div>
                  <div>
                    <p className="font-medium">Метод починки</p>
                    <p>{malfunction.repairMethod}</p>
                  </div>
                  <div>
                    <p className="font-medium">Цена</p>
                    <p>{malfunction.price} ₽</p>
                  </div>
                </div>
              ) : (
                <p>Информация по поломке не найдена.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
