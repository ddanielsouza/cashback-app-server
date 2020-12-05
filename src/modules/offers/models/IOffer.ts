import { ObjectID } from 'mongodb';

export default interface IOffer {
   id: ObjectID;
   advertiser_name: string;
   url: string;
   description: string;
   starts_at: Date;
   ends_at?: Date;
   premium: boolean;
   disable: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}
