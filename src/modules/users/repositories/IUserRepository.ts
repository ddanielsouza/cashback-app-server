import IUser from '../models/IUser';

export default interface IUserRepository {
   create(data: Omit<IUser, 'id'>): Promise<IUser>;
   findById(id: string): Promise<IUser | undefined>;
   findByEmail(email: string): Promise<IUser | undefined>;
}
