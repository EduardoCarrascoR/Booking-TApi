import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("Fallback exception handler triggerd");
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse(); 

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      createdBy: 'FallbackExceptionFilter',
      errorMessage: exception.message ? exception.message : 'Unexpected error ocurred'
    })
  }
}
