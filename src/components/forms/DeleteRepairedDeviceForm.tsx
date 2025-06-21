'use client';

import { ConfirmDelete } from './ConfirmDelete';
import { useRouter } from 'next/navigation';
import { deleteRepairedDevice } from '@/server/actions/repaired-devices/deleteRpairedDevice';
import { toast } from '@/hooks/use-toast';

interface DeleteRepairedDeviceFormProps {
  deviceId: string;
  deviceName: string;
}

export function DeleteRepairedDeviceForm({ deviceId, deviceName }: DeleteRepairedDeviceFormProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteRepairedDevice(deviceId);

      if (result.is_error) {
        toast({
          variant: 'destructive',
          title: 'Ошибка удаления',
          description: result.message || 'Не удалось удалить устройство',
        });
      } else {
        toast({
          title: 'Устройство удалено',
          description: `Устройство "${deviceName}" успешно удалено`,
        });
        router.push('/repaired-devices');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Произошла непредвиденная ошибка',
      });
    }
  };

  return (
    <ConfirmDelete
      onConfirm={handleDelete}
      message={`Вы уверены что хотите удалить устройство "${deviceName}"? Это действие нельзя отменить.`}
    />
  );
}
