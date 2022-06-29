// import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, _res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

// シンプルな実装であれば関数型ミドルウェアで記述する
// @see https://docs.nestjs.com/middleware#functional-middleware
export function logger(req: Request, _res: Response, next: NextFunction) {
  console.log(`Requesting: [${req.method}] ${req.originalUrl}`);
  console.log('  body: ', req.body);
  console.log('  query: ', req.query);
  next();
}
