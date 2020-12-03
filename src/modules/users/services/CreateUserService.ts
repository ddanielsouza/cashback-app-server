import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import IServices from '@shared/services/IServices';
import { inject, injectable } from 'tsyringe';
import IUser from '../models/IUser';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

@injectable()
export default class CreateUserService implements IServices {
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,
      @inject('HashProvider')
      private hashProvider: IHashProvider,
   ) {}

   public async execute({ name, email, password }: IRequest): Promise<IUser> {
      if (!name) {
         throw new AppError('Name is required');
      }

      if (!email) {
         throw new AppError('Email is required');
      }

      if (!password || password.length < 6) {
         throw new AppError('Password is missing or invalid (Min length: 6)');
      }

      const foundUserByEmail = await this.userRepository.findByEmail(email);

      if (foundUserByEmail) {
         throw new AppError('E-mail is already in use');
      }

      const user = await this.userRepository.create({
         name,
         email,
         password: await this.hashProvider.generateHash(password),
      });

      return user;
   }
}
