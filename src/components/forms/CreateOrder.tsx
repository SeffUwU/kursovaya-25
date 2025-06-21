'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createOrder } from '@/server/actions/orders/createOrder';
import { useState } from 'react';
import { IMalfunction, IServicedStore } from '@/entities';
import { useToast } from '@/hooks/use-toast';
import { getMalfunctions } from '@/server/actions/malfunctions/actions';
import { getStores } from '@/server/actions/stores/getStores';
import { useRouter } from 'next/navigation';

export function CreateOrderPopup() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [malfunctions, setMalfunctions] = useState<IMalfunction[]>([]);
  const [stores, setStores] = useState<IServicedStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerFio: '',
    serial: '',
    malfunctionId: '',
    servicedStoreId: '',
    price: '0',
    guaranteeNote: '',
  });
  const router = useRouter();

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createOrder({
        customerFio: formData.customerFio,
        serial: formData.serial,
        malfunctionId: formData.malfunctionId,
        servicedStoreId: formData.servicedStoreId,
        price: parseInt(formData.price),
        guaranteeNote: formData.guaranteeNote,
      });

      router.refresh();

      if (result.is_error) {
        throw new Error(result.message);
      }

      toast({
        title: 'Order Created',
        description: 'The new order has been successfully created',
      });
      setOpen(false);
      setFormData({
        customerFio: '',
        serial: '',
        malfunctionId: '',
        servicedStoreId: '',
        price: '0',
        guaranteeNote: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.message || 'Failed to create order',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="absolute right-5 bottom-5">
        <Button variant="default">Новый заказ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Новый заказ</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-4 text-center">Загрузка...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">ФИО клиента</label>
                <Input name="customerFio" value={formData.customerFio} onChange={handleInputChange} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Серийный номер</label>
                <Input name="serial" value={formData.serial} onChange={handleInputChange} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Неисправность</label>
                <Select
                  value={formData.malfunctionId}
                  onValueChange={(value) => handleSelectChange('malfunctionId', value)}
                  required
                >
                  <SelectTrigger className="w-[550px] text-ellipsis overflow-hidden">
                    <SelectValue placeholder="Select malfunction" />
                  </SelectTrigger>
                  <SelectContent className="h-60 ">
                    {malfunctions.map((malfunction) => (
                      <SelectItem key={malfunction.id} value={malfunction.id}>
                        {malfunction.description} ({malfunction.price}₽)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Магазин</label>
                <Select
                  value={formData.servicedStoreId}
                  onValueChange={(value) => handleSelectChange('servicedStoreId', value)}
                  required
                >
                  <SelectTrigger className="w-[550px] text-ellipsis overflow-hidden">
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent className="h-60 ">
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name} - {store.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Цена</label>
                <Input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Гарантийный талон (Необязательно)</label>
                <Input name="guaranteeNote" value={formData.guaranteeNote} onChange={handleInputChange} />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Создать заказ</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
