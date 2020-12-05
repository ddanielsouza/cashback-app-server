import { inject, injectable } from 'tsyringe';
import IOffer from '../models/IOffer';
import IOfferRepository from '../repositories/IOfferRepository';

@injectable()
export default class GetOffersService {
   constructor(
      @inject('OfferRepository')
      private offerRepository: IOfferRepository,
   ) {}

   public async execute(): Promise<IOffer[]> {
      const offers = await this.offerRepository.find();

      return offers;
   }
}
