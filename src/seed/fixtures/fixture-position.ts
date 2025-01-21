import { IPosition } from '@/entities';
import { WithoutGenerated } from '@/types/utils/utils.types';

export const adminId = '261cd88d-e143-496d-9f44-b43b3620bfc4';
export const positionFixture: (WithoutGenerated<IPosition> & { id: string })[] = [
  {
    id: adminId,
    name: 'Администратор',
    requirements: 'Высшее образование',
    responsibilities:
      'Следить за залом. Следить за приемной. Принимать заказы и сломанную технику. Отвечать на телефонные звонки',
    salary: 15000,
  },
  {
    id: 'aa7f052f-e231-4a78-9ac3-878f2052c743',
    name: 'Техник',
    requirements: 'мин. Среднее специальное образование',
    responsibilities:
      'Анализ и диагностика техники/инструмента. Ремонт техники. Составление детальных отчетов произведенного ремонта.',
    salary: 16000,
  },
  {
    id: 'a67248fb-3e09-4d3d-9e27-d369baf2bb67',
    name: 'Уборщик',
    requirements: 'Отсутствуют',
    responsibilities: 'Уборка помещений. Отнесенность к чистоте на рабочем месте техников.',
    salary: 12000,
  },
  {
    id: '50c22835-70ce-4595-b03f-1c743bc94683',
    name: 'Бухгалтер',
    requirements: 'Высшее образование',
    responsibilities: 'Вести бухгалтерский учет. Работа в 1C.',
    salary: 16000,
  },
  {
    id: 'cb7c369f-66e1-420f-a677-4fe1b69e1e5f',
    name: 'Директор',
    requirements: 'Высшее образование',
    responsibilities:
      'Поиск новых решений. Поиск новых договоров и партнеров. Отчетность перед государством. Организация офисных закупок.',
    salary: 22000,
  },
];
