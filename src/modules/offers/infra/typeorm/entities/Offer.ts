import {
   Entity,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ObjectIdColumn,
} from 'typeorm';

import { ObjectID } from 'mongodb';
import IOffer from '@modules/offers/models/IOffer';
import { Expose } from 'class-transformer';
import { isBefore } from 'date-fns';

@Entity('offers')
class Offer implements IOffer {
   @ObjectIdColumn()
   public id: ObjectID;

   @Column()
   advertiser_name: string;

   @Column()
   url: string;

   @Column()
   description: string;

   @Column()
   starts_at: Date;

   @Column()
   ends_at?: Date | undefined;

   @Column()
   premium: boolean;

   @Column()
   disable: boolean;

   @CreateDateColumn()
   public createdAt: Date;

   @UpdateDateColumn()
   public updatedAt: Date;

   @Expose({ name: 'calcDisable' })
   getCalcDisable(): boolean {
      const currentDate = new Date();

      if (this.disable) {
         return true;
      }

      if (isBefore(currentDate, this.starts_at)) {
         return true;
      }

      if (!this.ends_at) {
         return false;
      }

      return isBefore(this.ends_at, currentDate);
   }
}

export default Offer;
