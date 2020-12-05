import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOffer from '../models/IOffer';
import IOfferRepository from '../repositories/IOfferRepository';

interface IRequest {
   id: string;
   advertiser_name: string;
   url: string;
   description: string;
   starts_at: Date;
   ends_at?: Date;
   premium: boolean;
}

@injectable()
export default class UpdateOfferService {
   constructor(
      @inject('OfferRepository')
      private offerRepository: IOfferRepository,
   ) {}

   public async execute({
      id,
      advertiser_name,
      url,
      description,
      starts_at,
      ends_at,
      premium,
   }: IRequest): Promise<IOffer> {
      if (!advertiser_name) {
         throw new AppError('Advertiser name is required');
      }

      if (!url) {
         throw new AppError('Url is required');
      }

      if (!description) {
         throw new AppError('Description is required');
      }

      if (!starts_at) {
         throw new AppError('Starts at is required');
      }

      const pattern = new RegExp(
         '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
         'i',
      );

      if (!pattern.test(url.trim())) {
         throw new AppError('Invalid URL');
      }

      if (starts_at && ends_at) {
         if (starts_at.getTime() >= ends_at.getTime()) {
            throw new AppError('Start date cannot be less than the end date');
         }
      }

      const foundOfferByAdvertiseName = await this.offerRepository.findOne({
         advertiser_name: advertiser_name.trim(),
      });

      if (
         foundOfferByAdvertiseName &&
         foundOfferByAdvertiseName.id.toHexString() !== id
      ) {
         throw new AppError('Advertiser name is already in use', 409);
      }

      const offer = await this.offerRepository.updateById(id, {
         advertiser_name: advertiser_name.trim(),
         url: url.trim(),
         description,
         starts_at,
         ends_at,
         premium,
         disable: true,
      });

      return offer;
   }
}
