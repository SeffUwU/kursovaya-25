import { ErrorComponent } from '@/components/errors/ErrorComponent';
import { ConfirmDelete } from '@/components/forms/ConfirmDelete';
import { DeleteEmployeeForm } from '@/components/forms/DeleteEmployeeForm';
import { UpdateEmployeeForm } from '@/components/forms/UpdateEmployeeForm';
import { HeaderInfo } from '@/components/layout/HeaderInfo';
import { Button } from '@/components/ui/button';
import { deleteEmployee } from '@/server/actions/users/deleteEmployee';
import { getEmployeeInfo } from '@/server/actions/users/getEmployee';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { error } from 'console';
import { DeleteIcon, Trash2 } from 'lucide-react';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employeeInfo = await getEmployeeInfo(id);

  if (employeeInfo.is_error) {
    return <ErrorComponent code={ErrorCode.EmployeeNotFound} title="Сотрудник не найден" />;
  }

  const employee = employeeInfo.value.employees;
  const position = employeeInfo.value.positions!;

  return (
    <div className="p-4">
      <HeaderInfo title={employee.fio} description={position.name} type="employee" />
      <UpdateEmployeeForm
        employeeId={employee.id}
        initialData={{
          address: employee.address,
          fio: employee.fio,
          passport: employee.passport,
          phone: employee.phone,
          positionId: employee.positionId,
        }}
      />
      <DeleteEmployeeForm employeeId={employee.id} />
      <div>
        <h3 className="pt-4">Данные о сотруднике:</h3>
        <p>ФИО: {employee.fio}</p>
        <p>Телефон: {employee.phone}</p>
        <p>Паспортные данные: {employee.passport}</p>
        <p>Адрес: {employee.address}</p>
        <p>Дата рождения: {employee.dob?.toLocaleDateString()}</p>
        <h3 className="pt-2">Данные о должности:</h3>
        <p>Должность: {position.name}</p>
        <p>Обязанности: {position.responsibilities}</p>
        <p>Требования: {position.requirements}</p>
        <p>Заработная плата: {position.salary}</p>
      </div>
    </div>
  );
}
