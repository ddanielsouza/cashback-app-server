import {
   Entity,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ObjectIdColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import IUser from '@modules/users/models/IUser';
import { ObjectID } from 'mongodb';

@Entity('users')
class User implements IUser {
   @ObjectIdColumn()
   public id: ObjectID;

   @Column()
   public name: string;

   @Column()
   public email: string;

   @Column()
   @Exclude()
   public password: string;

   @CreateDateColumn()
   public createdAt: Date;

   @UpdateDateColumn()
   public updatedAt: Date;
}

export default User;
