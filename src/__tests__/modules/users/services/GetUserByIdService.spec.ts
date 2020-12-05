import 'reflect-metadata';
import '@shared/container';

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import GetUserByIdService from '@modules/users/services/GetUserByIdService';
import * as connection from '../../../utils/connection';

let createUsers: CreateUserService;
let getUserById: GetUserByIdService;

describe('GetUserById', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createUsers = container.resolve(CreateUserService);
      getUserById = container.resolve(GetUserByIdService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to get user by email', async () => {
      expect({});
      const userCreated = await createUsers.execute({
         name: 'john doe',
         email: 'johndoe@gmail.com',
         password: '123456',
      });

      const user = await getUserById.execute({ id: userCreated.id.toHexString() });

      expect(user.email).toBe('johndoe@gmail.com');
      expect(user.name).toBe('john doe');
   });
});
