'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { getOrders } from '@/server/actions/orders/getOrders';
import { getEmployees } from '@/server/actions/users/getEmployees';
import { Calendar } from '@/components/ui/calendar';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Order {
  id: string;
  orderDate: string;
  customerFio: string;
  price: number;
  servicedStore: {
    name: string;
  };
}

interface Part {
  id: string;
  name: string;
  price: number;
  varchar: string;
}

interface Employee {
  id: string;
  fio: string;
  phone: string;
  position: {
    name: string;
    salary: number;
  };
}

interface DailyRevenue {
  date: string;
  revenue: number;
}

interface PartCategory {
  name: string;
  value: number;
}

function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  const BOM = '\uFEFF';

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(';'), // Use semicolon as delimiter (better for European locales)
    ...data.map((row) =>
      headers
        .map((fieldName) => {
          // Handle nested objects
          if (fieldName.includes('.')) {
            const [parent, child] = fieldName.split('.');
            const value = row[parent]?.[child] ?? '';
            return `"${value.toString().replace(/"/g, '""')}"`; // Escape quotes
          }
          const value = row[fieldName] ?? '';
          return `"${value.toString().replace(/"/g, '""')}"`; // Escape quotes
        })
        .join(';'),
    ),
  ];

  const csvContent = BOM + csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Fetch orders with date range
    const fetchOrders = async () => {
      const response = await getOrders({
        page: 1,
        take: 100,
        dateFrom: dateRange.from,
        dateTo: dateRange.to,
      });
      if (!response.is_error) {
        setOrders(
          response.value.map((item: any) => ({
            id: item.orders.id,
            orderDate: item.orders.orderDate,
            customerFio: item.orders.customerFio,
            price: item.orders.price,
            servicedStore: {
              name: item.serviced_stores?.name || 'Не указано',
            },
          })),
        );
      }
    };

    const fetchParts = async () => {
      setParts(
        [
          { id: '1', name: 'Процессор', price: 15000, varchar: 'Intel i7' },
          { id: '2', name: 'Материнская плата', price: 8000, varchar: 'ASUS B450' },
          { id: '3', name: 'Оперативная память', price: 4000, varchar: '16GB DDR4' },
          { id: '4', name: 'Видеокарта', price: 35000, varchar: 'RTX 3080' },
          { id: '5', name: 'SSD', price: 5000, varchar: '1TB NVMe' },
        ].sort((a, b) => b.price - a.price),
      );
    };

    // Fetch employees
    const fetchEmployees = async () => {
      const response = await getEmployees({
        page: 1,
        take: 100,
      });
      if (!response.is_error) {
        setEmployees(
          response.value.map((item: any) => ({
            id: item.id,
            fio: item.fio,
            phone: item.phone,
            position: {
              name: item.position.name,
              salary: item.position.salary,
            },
          })),
        );
      }
    };

    fetchOrders();
    fetchParts();
    fetchEmployees();
  }, [dateRange]);

  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
  const [partCategories, setPartCategories] = useState<PartCategory[]>([]);

  useEffect(() => {
    const revenueByDay = orders.reduce((acc, order) => {
      const date = format(new Date(order.orderDate), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.price;
      return acc;
    }, {} as Record<string, number>);

    setDailyRevenue(
      Object.entries(revenueByDay).map(([date, revenue]) => ({
        date,
        revenue,
      })),
    );

    setPartCategories([
      { name: 'Процессоры', value: 5 },
      { name: 'Видеокарты', value: 8 },
      { name: 'Память', value: 12 },
      { name: 'Накопители', value: 7 },
      { name: 'Материнские платы', value: 4 },
    ]);
  }, [orders, parts]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Панель управления</h1>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="parts">Запчасти</TabsTrigger>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center justify-center">
                <div className="flex flex-col gap-2 sm:flex-row justify-center">
                  <div className="flex flex-col justify-center gap-2">
                    <CardTitle>Заказы</CardTitle>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range) setDateRange(range);
                      }}
                      className="border rounded-md"
                      locale={ru}
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        exportToCSV(
                          orders.map((V) => ({ ...V, servicedStore: V.servicedStore.name })),
                          'orders',
                        )
                      }
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Общая выручка: {totalRevenue.toLocaleString('ru-RU')} ₽</h3>
                <p className="text-sm text-muted-foreground">
                  За период с {format(dateRange.from!, 'PPP', { locale: ru })} по{' '}
                  {format(dateRange.to!, 'PPP', { locale: ru })}
                </p>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата заказа
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ФИО клиента
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Магазин
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Сумма
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(order.orderDate), 'PPP', { locale: ru })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerFio}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.servicedStore.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.price.toLocaleString('ru-RU')} ₽
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Выручка по дням</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} ₽`, 'Выручка']}
                        labelFormatter={(label) => `Дата: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" name="Выручка" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Запчасти</CardTitle>
                <Button variant="outline" onClick={() => exportToCSV(parts, 'parts')} className="gap-2">
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Характеристики
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Цена
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parts.map((part) => (
                      <tr key={part.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.varchar}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {part.price.toLocaleString('ru-RU')} ₽
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Сотрудники</CardTitle>
                <Button variant="outline" onClick={() => exportToCSV(employees, 'employees')} className="gap-2">
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ФИО
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Телефон
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Должность
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Зарплата
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.fio}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.position.salary.toLocaleString('ru-RU')} ₽
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
