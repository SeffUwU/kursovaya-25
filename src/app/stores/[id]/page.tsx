import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { DeleteStoreForm } from '@/components/forms/DeleteStoreForm';
import { UpdateServicedStore } from '@/components/forms/UpdateStoreForm';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { getStores } from '@/server/actions/stores/getStores';
import { ErrorCode } from '@/types/enums/error-code.enum';

export default async function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partInfo = await getStores({ page: 1, take: 1 }, id);

  if (partInfo.is_error) {
    return <ErrorComponent code={ErrorCode.EmployeeNotFound} title="Магазин не найден" />;
  }

  const part = partInfo.value[0];

  return (
    <div className="p-4">
      <HeaderInfo title={part.name} description={part.name} type="store" />
      <UpdateServicedStore initialData={part} storeId={part.id} />
      <DeleteStoreForm storeId={part.id} storeName={part.name} />
      <div>
        <h3 className="pt-4">Данные о магазине:</h3>
        <p>ID: {part.id}</p>
        <p>Наименование: {part.name}</p>
        <p>Адрес: {part.address}</p>
        <p>Телефон: {part.phone}</p>
        <p>Дата создания: {part.createdAt?.toString()}</p>
        <p>Дата обновления: {part.updatedAt?.toString()}</p>
      </div>
    </div>
  );
}
