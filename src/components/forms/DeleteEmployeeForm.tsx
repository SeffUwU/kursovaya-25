'use client';

import { deleteEmployee } from '@/server/actions/users/deleteEmployee';
import { ConfirmDelete } from './ConfirmDelete';

export function DeleteEmployeeForm({ employeeId }: { employeeId: string }) {
  return (
    <ConfirmDelete
      onConfirm={async () => {
        await deleteEmployee(employeeId);
      }}
    />
  );
}
