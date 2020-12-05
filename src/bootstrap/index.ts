import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export const createUsersDefault = async (): Promise<void> => {
   const createUser = container.resolve(CreateUserService);
   createUser.execute({
      name: 'Admin',
      email: 'admin@admin.com',
      password: '123456',
   });
};

export default {
   createUsersDefault,
};
