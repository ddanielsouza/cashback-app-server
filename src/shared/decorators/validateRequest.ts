/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import AppError from '@shared/errors/AppError';
import { Request } from 'express';
import * as Yup from 'yup';

interface IParams {
   localRequest: 'query' | 'params' | 'body';
   schema: Yup.ObjectSchema<any>;
}

interface IFunctionMakeValidate {
   (target: Object, name: string, descriptor: PropertyDescriptor): void;
}

const validateRequest = ({
   localRequest,
   schema,
}: IParams): IFunctionMakeValidate => {
   return (_target, _name, descriptor) => {
      const method = descriptor.value;

      descriptor.value = async function validate(...args: any[]) {
         const request: Request = args[0];
         const data = request[localRequest];

         try {
            await schema.validate(data, { abortEarly: false });
         } catch (err) {
            const { ValidationError } = Yup;

            if (err instanceof ValidationError) {
               const erros = err.inner.map(e => e.message).join('; ');
               throw new AppError(erros, 400);
            }

            throw err;
         }

         return method.apply(this, args);
      };
   };
};

export default validateRequest;
