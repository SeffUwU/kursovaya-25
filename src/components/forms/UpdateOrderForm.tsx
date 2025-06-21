'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IMalfunction, IOrder, IServicedStore } from '@/entities';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getMalfunctions } from '@/server/actions/malfunctions/actions';
import { getStores } from '@/server/actions/stores/getStores';
import { updateOrder } from '@/server/actions/orders/updateOrder';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UpdateOrderPopup({ order }: { order: IOrder }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [malfunctions, setMalfunctions] = useState([] as IMalfunction[]);
  const [stores, setStores] = useState([] as IServicedStore[]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(order.returnDate ? new Date(order.returnDate) : undefined);
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerFio: order.customerFio,
    serial: order.serial,
    malfunctionId: order.malfunctionId,
    servicedStoreId: order.servicedStoreId,
    price: order.price.toString(),
    guaranteeNote: order.guaranteeNote || '',
  });

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setLoading(true);
      try {
        const malfunctionsData = await getMalfunctions({ page: 0, take: 100 });
        const storesData = await getStores({ page: 0, take: 100 });

        if (!malfunctionsData.is_error) setMalfunctions(malfunctionsData.value);
        if (!storesData.is_error) setStores(storesData.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateOrder({
        id: order.id,
        customerFio: formData.customerFio,
        serial: formData.serial,
        malfunctionId: formData.malfunctionId,
        servicedStoreId: formData.servicedStoreId,
        price: parseInt(formData.price, 10),
        guaranteeNote: formData.guaranteeNote,
        returnDate: date,
      });

      if (result.is_error) {
        throw new Error(result.message);
      }

      toast({
        title: 'Заказ обновлен',
        description: 'Информация о заказе успешно обновлена',
      });
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: (error as any)?.message || 'Не удалось обновить заказ',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} modal={false} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="absolute bottom-5 right-5">
          Редактировать заказ
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Редактирование заказа #{order.serial}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-4 text-center">Загрузка данных...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="customerFio">ФИО клиента</Label>
                <Input
                  id="customerFio"
                  name="customerFio"
                  value={formData.customerFio}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="serial">Серийный номер</Label>
                <Input id="serial" name="serial" value={formData.serial} onChange={handleInputChange} required />
              </div>

              <div>
                <Label htmlFor="malfunctionId">Неисправность</Label>
                <Select
                  value={formData.malfunctionId}
                  onValueChange={(value) => handleSelectChange('malfunctionId', value)}
                  required
                >
                  <SelectTrigger className="w-[550px] overflow-hidden text-ellipsis">
                    <SelectValue placeholder="Выберите неисправность" />
                  </SelectTrigger>
                  <SelectContent>
                    {malfunctions.map((malfunction) => (
                      <SelectItem key={malfunction.id} value={malfunction.id}>
                        {malfunction.description} ({malfunction.price} ₽)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="servicedStoreId">Сервисный центр</Label>
                <Select
                  value={formData.servicedStoreId}
                  onValueChange={(value) => handleSelectChange('servicedStoreId', value)}
                  required
                >
                  <SelectTrigger className="w-[550px] overflow-hidden text-ellipsis">
                    <SelectValue placeholder="Выберите сервисный центр" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name} - {store.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Стоимость ремонта (₽)</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="guaranteeNote">Гарантийные заметки</Label>
                <Input
                  id="guaranteeNote"
                  name="guaranteeNote"
                  value={formData.guaranteeNote}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Дата возврата</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Выберите дату</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="z-[60]" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">Сохранить изменения</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
