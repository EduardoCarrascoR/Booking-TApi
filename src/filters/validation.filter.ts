import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ValidationException } from './validation.exception';
import { Request, Response } from 'express';

@Catch()
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>(); 
    const request = ctx.getRequest<Request>(); 

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      createdBy: 'ValidationFilter',
      timestamp: new Date().toISOString(),
      path: request.url,
      validationErrors: exception.validationErrors
    })
  }
}
