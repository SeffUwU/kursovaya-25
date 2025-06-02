import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { getPartInfo } from '@/server/actions/parts/getPart';
import { ErrorCode } from '@/types/enums/error-code.enum';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partInfo = await getPartInfo(id);

  if (partInfo.is_error) {
    return <ErrorComponent code={ErrorCode.EmployeeNotFound} title="Сотрудник не найден" />;
  }

  const part = partInfo.value;

  return (
    <div className="p-4">
      <HeaderInfo title={part.name} description={part.varchar} type="part" />
      <div>
        <h3 className="pt-4">Данные о деталях:</h3>
        <p>ID: {part.id}</p>
        <p>Наименование: {part.name}</p>
        <p>Описание: {part.varchar}</p>
        <p>Цена: {part.price}</p>
        <p>Дата создания: {part.createdAt?.toString()}</p>
        <p>Дата обновления: {part.updatedAt?.toString()}</p>
      </div>
    </div>
  );
}
