import { RussianErrorMessages } from '@/dictionary/errors/ru';
import { ErrorCode } from '@/types/enums/error-code.enum';
import { HttpStatusCode } from '../responses/response.status';

export interface ServerActionErrorMessage {
  status: HttpStatusCode;
  code: ErrorCode;
  message: string;
  is_error: true;
}

interface ServerActionErrorFn {
  (status: HttpStatusCode, code: ErrorCode): ServerActionErrorMessage;
}

/**
 * NextJS server action doesn't support throwing errors.. so we make this "special" response with error code.
 * @param status - http status code
 * @param code - error code
 * @returns ServerActionErrorMessage
 */
export const ServerActionError: ServerActionErrorFn = (status, code) => {
  return <ServerActionErrorMessage>{
    status,
    code,
    message: RussianErrorMessages[code],
    is_error: true,
  };
};
