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
      await connection.clear();
      createUsers = container.resolve(CreateUserService);
   });

   it('should be able to create a new user', async () => {
      expect({});
      const user = await createUsers.execute({
         name: 'Jhon doe',
         email: 'jhondoe@gmail.com',
         password: '123456',
      });

      expect(user).toHaveProperty('id');
      expect(user.email).toBe('jhondoe@gmail.com');
   });
});
