'use client';

import { deleteStore } from '@/server/actions/stores/deleteStore';
import { ConfirmDelete } from './ConfirmDelete';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface DeleteStoreFormProps {
  storeId: string;
  storeName: string;
}

export function DeleteStoreForm({ storeId, storeName }: DeleteStoreFormProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteStore(storeId);

      if (result.is_error) {
        toast({
          variant: 'destructive',
          title: 'Ошибка удаления',
          description: result.message || 'Не удалось удалить магазин',
        });
      } else {
        toast({
          title: 'Магазин удален',
          description: `Магазин "${storeName}" успешно удален`,
        });
        router.push('/stores');
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
      message={`Вы уверены что хотите удалить магазин "${storeName}"? Это действие нельзя отменить.`}
    />
  );
}
