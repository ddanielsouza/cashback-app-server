import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import IAuthProvider from '../IAuthProvider';

export default class JsonWebTokenProvider implements IAuthProvider {
   async authenticate(userId: string): Promise<string> {
      const token = sign({}, authConfig.jwt.secret, {
         subject: userId,
         expiresIn: authConfig.jwt.expiresIn,
      });

      return token;
   }
}
