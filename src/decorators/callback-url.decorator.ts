import { CallbackUrlHeader } from '@modules/auth/dto/reset-password.dto';
import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { ExecutionRequest } from './context';

export const CallbackUrl = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const req: ExecutionRequest = ctx.switchToHttp().getRequest();
    const data = new CallbackUrlHeader();
    data.callbackUrl = req.headers['x-callback-url'] as string;
    console.log(data);
    const errors = await validate(data);
    if (errors.length === 0) return data.callbackUrl;
    throw new BadRequestException(Object.values(errors[0].constraints));
  },
);
