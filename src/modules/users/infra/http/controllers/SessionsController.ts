import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import validateRequest from '@shared/decorators/validateRequest';
import createSessionSchema from '../../yup/validations/createSession.schema';

export default class SessionsController {
   @validateRequest({ localRequest: 'body', schema: createSessionSchema })
   public async create(request: Request, response: Response): Promise<Response> {
      const { email, password } = request.body;
      const authenticateUserService = container.resolve(AuthenticateUserService);
      const { user, token } = await authenticateUserService.execute({
         email,
         password,
      });

      return response.json({ user: classToClass(user), token });
   }
}
