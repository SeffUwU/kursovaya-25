import { employee, part, position } from '@/entities';
import { db } from '@/server/database';
import chalk from 'chalk';
import { positionFixture } from './fixtures/fixture-position';
import { employeeFixture } from './fixtures/fixture-employees';
import { partsFixture } from './fixtures/fixture-parts';

const seed = async () => {
  // Positions
  await db.insert(position).values(positionFixture).execute();

  // Employees
  await db.insert(employee).values(employeeFixture).execute();

  // Parts

  await db.insert(part).values(partsFixture).execute();
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
