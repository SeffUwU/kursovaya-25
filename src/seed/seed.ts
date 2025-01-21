import { employee, position } from '@/entities';
import { db } from '@/server/database';
import chalk from 'chalk';
import { positionFixture } from './fixtures/fixture-position';
import { employeeFixture } from './fixtures/fixture-employees';

const seed = async () => {
  // Positions
  await db.insert(position).values(positionFixture).execute();

  // Employees
  await db.insert(employee).values(employeeFixture).execute();
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
