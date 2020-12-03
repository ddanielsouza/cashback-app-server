import { ObjectID } from 'mongodb';

export default interface IUser {
   id: ObjectID;
   email: string;
   password: string;
   name: string;
   createdAt?: Date;
   updatedAt?: Date;
}
