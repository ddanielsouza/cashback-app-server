export default interface IOffer {
   id: string;
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
