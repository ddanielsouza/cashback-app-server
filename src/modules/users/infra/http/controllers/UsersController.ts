import { Request, Response } from 'express';
import validateRequest from '@shared/decorators/validateRequest';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import createUserSchema from '../../yup/validations/createUser.schema';

export default class UsersController {
   @validateRequest({ localRequest: 'body', schema: createUserSchema })
   public async create(request: Request, response: Response): Promise<Response> {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({ name, email, password });
      return response.status(201).json(classToClass(user));
   }
}
