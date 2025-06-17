import { ErrorCode } from '@/types/enums/error-code.enum';

export const RussianErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.PhoneTaken]: 'Этот телефон уже занят',
  [ErrorCode.NotAuthorized]: 'Не авторизован',
  [ErrorCode.TokenExpired]: 'Сессия устарела',
  [ErrorCode.EmployeeNotFound]: 'Пользователь не найден',
  [ErrorCode.InternalServerError]: 'Произошла серверная ошибка. Свяжитесь с НАМИ если это будет продолжаться.',
  [ErrorCode.PartNotFound]: 'Компонент не найден',
  [ErrorCode.AlreadyExists]: 'Уже существует по названию',
};
