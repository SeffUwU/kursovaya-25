import { getMyId } from '@/server/actions/users/getMyId';
import UserPage from '../employees/[id]/page';
import { ErrorComponent } from '@/components/errors/ErrorComponent';

export default async function ProfilePage() {
  const response = await getMyId();

  if (response.is_error) {
    return <ErrorComponent description="не смог подтянуть данные о текущем пользователе" />;
  }
  return <UserPage params={{ id: response.value } as any} />;
}
