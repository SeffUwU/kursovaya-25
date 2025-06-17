import { IEmployee } from '@/entities';
import { WithoutGenerated } from '@/types/utils/utils.types';
import { randFullAddress, randFullName, randPhoneNumber, randRecentDate } from '@ngneat/falso';

import bcrypt from 'bcrypt';
import { adminId, positionFixture } from './fixture-position';
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomPosition = () => positionFixture[randomIntFromInterval(0, positionFixture.length - 1)].id;

export const employeeFixture: WithoutGenerated<IEmployee>[] = [
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: '+79054431272',
    passwordHash: await bcrypt.hash('1', 10),
    positionId: adminId,
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('2', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('3', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('4', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('5', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('6', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('7', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('8', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('9', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('10', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('11', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('12', 10),
    positionId: getRandomPosition(),
  },
  {
    fio: randFullName({ locale: 'RU' }),
    address: randFullAddress(),
    dob: randRecentDate(),
    passport: `340-40-40. МВД. Ставропольский Край`,
    phone: randPhoneNumber({ countryCode: 'RU' }),
    passwordHash: await bcrypt.hash('13', 10),
    positionId: getRandomPosition(),
  },
];
