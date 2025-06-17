import { IServicedStore } from '@/entities/servicedStore.entity';
import { WithoutGenerated } from '@/types/utils/utils.types';
import { randCompanyName, randFullAddress, randPhoneNumber } from '@ngneat/falso';

export const servicedStoreFixture: WithoutGenerated<IServicedStore>[] = Array.from({ length: 25 }).map(() => ({
  address: randFullAddress(),
  name: randCompanyName(),
  phone: randPhoneNumber({ countryCode: 'RU' }),
}));
