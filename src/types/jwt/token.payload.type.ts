import { IEmployee } from '@/entities';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends Omit<IEmployee, 'passwordHash'>, JwtPayload {}
