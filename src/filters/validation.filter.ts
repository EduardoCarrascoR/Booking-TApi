import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ValidationException } from './validation.exception';

@Catch()
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse();

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      createdBy: 'ValidationFilter',
      validationErrors: exception.validationErrors
    })
  }
}
