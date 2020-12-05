import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOffer from '../models/IOffer';
import IOfferRepository from '../repositories/IOfferRepository';

interface IRequest {
   id: string;
}

@injectable()
export default class GetOfferByIdService {
   constructor(
      @inject('OfferRepository')
      private offerRepository: IOfferRepository,
   ) {}

   public async execute({ id }: IRequest): Promise<IOffer> {
      const offer = await this.offerRepository.findById(id);

      if (!offer) {
         throw new AppError('Offer does not found', 404);
      }

      return offer;
   }
}
