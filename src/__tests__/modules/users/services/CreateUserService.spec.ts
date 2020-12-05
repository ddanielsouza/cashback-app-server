import 'reflect-metadata';
import '@shared/container';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import * as connection from '../../../utils/connection';

let createUsers: CreateUserService;

describe('CreateUsers', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createUsers = container.resolve(CreateUserService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to create a new user', async () => {
      ;
      const user = await createUsers.execute({
         name: 'john doe',
         email: 'johndoe@gmail.com',
         password: '123456',
      });

      expect(user).toHaveProperty('id');
      expect(user.email).toBe('johndoe@gmail.com');
   });
});
