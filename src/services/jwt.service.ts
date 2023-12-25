import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

  generateToken(data: any): string {
    return jwt.sign(data, this.SECRET_KEY, { expiresIn: '1d' });
  }

  verifyToken(token: string): any {
    try {
      const tokenModified = token.split(' ')[1];
      return jwt.verify(tokenModified, this.SECRET_KEY);
    } catch (err) {
      return null;
    }
  }
}
