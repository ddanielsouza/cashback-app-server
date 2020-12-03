import CreateUserService from '@modules/users/services/CreateUserService';

let createUsers: CreateUserService;

describe('CreateUsers', () => {
   beforeEach(() => {
      createUsers = new CreateUserService();
   });

   it('should be able to create a new user', async () => {
      const user = await createUsers.execute({
         name: 'Jhon doe',
         email: 'jhondoe@gmail.com',
         password: '123456',
      });

      expect(user).toHaveProperty('id');
      expect(user.email).toBe('jhondoe@gmail.com');
   });
});
