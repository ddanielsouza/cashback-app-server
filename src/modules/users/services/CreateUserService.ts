import IServices from '@shared/services/IServices';
import IUser from '../infra/models/IUser';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

export default class CreateUserService implements IServices {
   public async execute({ name, email, password }: IRequest): Promise<IUser> {
      throw new Error('Method not implemented.');
   }
}
