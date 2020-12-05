import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import * as connection from '../../../utils/connection';

let authenticateUser: AuthenticateUserService;
let createUsers: CreateUserService;

describe('AuthenticateUser', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      authenticateUser = container.resolve(AuthenticateUserService);
      createUsers = container.resolve(CreateUserService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to create a new session', async () => {
      ;

      await createUsers.execute({
         name: 'john doe',
         email: 'johndoe@gmail.com',
         password: '123456',
      });

      const auth = await authenticateUser.execute({
         email: 'johndoe@gmail.com',
         password: '123456',
      });

      expect(auth).toHaveProperty('token');
      expect(auth).toHaveProperty('user');
   });
});
