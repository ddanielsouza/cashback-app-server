import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import * as connection from '../../../utils/connection';

let authenticateUser: AuthenticateUserService;
let createUsers: CreateUserService;

describe('CreateUsers', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      await connection.clear();
      authenticateUser = container.resolve(AuthenticateUserService);
      createUsers = container.resolve(CreateUserService);
   });

   it('should be able to create a new session', async () => {
      expect({});

      await createUsers.execute({
         name: 'Jhon doe',
         email: 'jhondoe@gmail.com',
         password: '123456',
      });

      const auth = await authenticateUser.execute({
         email: 'jhondoe@gmail.com',
         password: '123456',
      });

      expect(auth).toHaveProperty('token');
      expect(auth).toHaveProperty('user');
   });
});
