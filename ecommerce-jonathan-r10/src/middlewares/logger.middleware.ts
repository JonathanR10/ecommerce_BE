import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();
    console.log(
      `\x1b[32mMethod= \x1b[0m ${method}. \x1b[32mUrl= \x1b[0m${originalUrl}.\x1b[32m Ip = \x1b[0m${ip}. \x1b[32mDateTime =\x1b[0m ${date} - ${time}  `,
    );
    next();
  }
}
