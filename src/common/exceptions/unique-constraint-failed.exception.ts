import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export class UniqueConstraintFailedException extends BadRequestException {
  constructor(error: PrismaClientKnownRequestError) {
    const target = (error.meta?.target as string[]) ?? [];
    super(`Unique constraint failed on the ${target.join(', ')}`);
  }
}
