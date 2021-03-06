import IUser from '@modules/users/models/IUser';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
   private ormRepository: Repository<User>;

   constructor() {
      this.ormRepository = getRepository(User);
   }

   public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({ id });

      return user;
   }

   public async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({ where: { email } });

      return user;
   }

   public async create(data: Omit<IUser, 'id'>): Promise<User> {
      const user = this.ormRepository.create({ id: v4(), ...data });

      await this.ormRepository.save(user);

      return user;
   }
}

export default UsersRepository;
