import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';
import IAuthProvider from '../providers/authProvider/IAuthProvider';
import IUser from '../models/IUser';

interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: IUser;
   token: string;
}

@injectable()
export default class AuthenticateUserService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,
      @inject('HashProvider')
      private hashProvider: IHashProvider,
      @inject('AuthProvider')
      private authProvider: IAuthProvider,
   ) {}

   public async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordMatched = await this.hashProvider.compareHash(
         password,
         user.password as string,
      );

      if (!passwordMatched) {
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const token = await this.authProvider.authenticate(user.id.toHexString());

      return { user, token };
   }
}
