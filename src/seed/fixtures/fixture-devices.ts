import { IRepairedDevice } from '@/entities';
import { WithoutGenerated } from '@/types/utils/utils.types';
import { randAccessory, randCatchPhrase, randProduct, randVehicleManufacturer } from '@ngneat/falso';

export const repairedDevicesFixture: WithoutGenerated<IRepairedDevice>[] = Array.from({ length: 100 }).map(() => {
  const product = randProduct();

  return {
    type: product.category,
    name: product.title,
    characteristics: randCatchPhrase(),
    details: randAccessory(),
    manufacturer: randVehicleManufacturer(),
  };
});
