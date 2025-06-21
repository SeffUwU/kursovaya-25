import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { getRepairedDeviceById } from '@/server/actions/repaired-devices/getRepairedDevice';
import { ErrorCode } from '@/types/enums/error-code.enum';

export default async function RepairedDevicePage({ params }: { params: { id: string } }) {
  const deviceInfo = await getRepairedDeviceById(params.id);

  if (deviceInfo.is_error) {
    return <ErrorComponent code={ErrorCode.NotFound} title="Устройство не найдено" />;
  }

  const device = deviceInfo.value;

  return (
    <div className="p-4">
      <HeaderInfo title={device.name} description={`${device.manufacturer} - ${device.type}`} type="part" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className=" p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Основная информация</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">ID:</span> {device.id}
            </p>
            <p>
              <span className="font-medium">Наименование:</span> {device.name}
            </p>
            <p>
              <span className="font-medium">Тип:</span> {device.type}
            </p>
            <p>
              <span className="font-medium">Производитель:</span> {device.manufacturer}
            </p>
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Характеристики</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Характеристики:</span> {device.characteristics}
            </p>
            <p>
              <span className="font-medium">Комплектация:</span> {device.details}
            </p>
          </div>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Даты</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Дата создания:</span> {device.createdAt?.toDateString()}
            </p>
            <p>
              <span className="font-medium">Дата обновления:</span> {device.updatedAt?.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
