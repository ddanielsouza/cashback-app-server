import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IUser from '../models/IUser';

interface IRequest {
   id: string;
}

@injectable()
export default class GetUserByIdService {
   constructor(
      @inject('UserRepository')
      private usersRepository: IUserRepository,
   ) {}

   public async execute({ id }: IRequest): Promise<IUser> {
      const user = await this.usersRepository.findById(id);

      if (!user) {
         throw new AppError('User not found', 404);
      }

      return user;
   }
}
