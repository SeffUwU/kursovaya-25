import { employee, part, position, repairedDevice } from '@/entities';
import { servicedStore } from '@/entities/servicedStore.entity';
import { db } from '@/server/database';
import chalk from 'chalk';
import { repairedDevicesFixture } from './fixtures/fixture-devices';
import { employeeFixture } from './fixtures/fixture-employees';
import { partsFixture } from './fixtures/fixture-parts';
import { positionFixture } from './fixtures/fixture-position';
import { servicedStoreFixture } from './fixtures/fixture-stores';

const seed = async () => {
  // Positions
  await db.insert(position).values(positionFixture).onConflictDoNothing().execute();
  // Employees
  await db.insert(employee).values(employeeFixture).onConflictDoNothing().execute();
  // Parts
  await db.insert(part).values(partsFixture).onConflictDoNothing().execute();
  // Serviced stores
  await db.insert(servicedStore).values(servicedStoreFixture).onConflictDoNothing().execute();
  // Repaired Devices
  await db.insert(repairedDevice).values(repairedDevicesFixture).onConflictDoNothing().execute();
};

seed()
  .then(() => {
    console.log(chalk.green('Seeding successful'));
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding db', err);
    process.exit(1);
  });
