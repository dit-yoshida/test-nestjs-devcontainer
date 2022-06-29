import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime';
import { UniqueConstraintFailedException } from '../exceptions/unique-constraint-failed.exception';
import { PrismaError } from '../utils/PrismaError';
import { HttpExceptionFilter } from './http-exception.filter';

@Catch(PrismaClientKnownRequestError, PrismaClientUnknownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(
    exception: PrismaClientKnownRequestError | PrismaClientUnknownRequestError,
    host: ArgumentsHost,
  ) {
    let parsedHttpException: HttpException = new InternalServerErrorException();

    // prisma 実行エラー考慮
    // @see https://www.prisma.io/docs/reference/api-reference/error-reference
    // @see https://wanago.io/2021/03/29/api-nestjs-prisma-postgresql/
    if ('code' in exception) {
      switch (exception.code) {
        case PrismaError.UniqueConstraintFailed:
          parsedHttpException = new UniqueConstraintFailedException(exception);
          break;
        // TODO: 他エラー考慮
      }
    }

    new HttpExceptionFilter().catch(parsedHttpException, host);
  }
}
