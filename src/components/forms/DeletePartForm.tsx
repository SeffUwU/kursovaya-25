'use client';

import { deletePart } from '@/server/actions/parts/deletePart';
import { ConfirmDelete } from './ConfirmDelete';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface DeletePartFormProps {
  partId: string;
  partName: string;
}

export function DeletePartForm({ partId, partName }: DeletePartFormProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deletePart(partId);

      if (result.is_error) {
        toast({
          variant: 'destructive',
          title: 'Ошибка удаления',
          description: result.message || 'Не удалось удалить деталь',
        });
      } else {
        toast({
          title: 'Деталь удалена',
          description: `Деталь "${partName}" успешно удалена`,
        });
        router.push('/parts');
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
      message={`Вы уверены что хотите удалить деталь "${partName}"? Это действие нельзя отменить.`}
    />
  );
}
