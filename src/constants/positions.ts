export enum PositionEnum {
  ADMIN = 'Администратор',
  TECHNICIAN = 'Техник',
  CLEANER = 'Уборщик',
  ACCOUNTANT = 'Бухгалтер',
  DIRECTOR = 'Директор',
}

export const POSITION_IDS: Record<PositionEnum, string> = {
  [PositionEnum.ADMIN]: '261cd88d-e143-496d-9f44-b43b3620bfc4',
  [PositionEnum.TECHNICIAN]: 'aa7f052f-e231-4a78-9ac3-878f2052c743',
  [PositionEnum.CLEANER]: 'a67248fb-3e09-4d3d-9e27-d369baf2bb67',
  [PositionEnum.ACCOUNTANT]: '50c22835-70ce-4595-b03f-1c743bc94683',
  [PositionEnum.DIRECTOR]: 'cb7c369f-66e1-420f-a677-4fe1b69e1e5f',
};
