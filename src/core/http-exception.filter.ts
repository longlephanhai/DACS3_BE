import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Lấy message gốc của exception
    const defaultResponse = exception.getResponse();

    // Kiểm tra nếu lỗi là 413 (Payload Too Large)
    if (status === 413) {
      response.status(status).json({
        error: "Payload too large",
        message: "File too large - customize",
        statusCode: status,
      });
    } else {
      // Trả về lỗi gốc nếu không phải 413
      response.status(status).json({
        ...(
          typeof defaultResponse === 'object'
            ? defaultResponse
            : { message: defaultResponse }
        ),
        statusCode: status,
      });
    }
  }
}