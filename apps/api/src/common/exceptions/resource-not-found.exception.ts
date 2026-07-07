import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, identifier: string) {
    super(
      {
        code: 'NOT_FOUND',
        message: `${resource} with identifier "${identifier}" was not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
