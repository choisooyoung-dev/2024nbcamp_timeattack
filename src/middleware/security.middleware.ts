import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Implement additional security measures as needed
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // Add more headers or security measures as needed
    next();
  }
}
