import {
   Entity,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ObjectIdColumn,
   BeforeInsert,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import IUser from '@modules/users/models/IUser';
import { v4 } from 'uuid';

@Entity('users')
class User implements IUser {
   @ObjectIdColumn()
   _id: string;

   @Column()
   id: string;

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

   @BeforeInsert()
   onBeforeInsert(): void {
      this.id = v4();
   }
}

export default User;
