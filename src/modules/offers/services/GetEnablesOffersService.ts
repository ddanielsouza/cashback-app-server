import { inject, injectable } from 'tsyringe';
import IOffer from '../models/IOffer';
import IEnableOffersPagination from '../repositories/dtos/IEnableOffersPagination';
import IOfferRepository from '../repositories/IOfferRepository';

interface IRequest {
   limit: number;
   page: number;
}

@injectable()
export default class GetEnablesOffersService {
   constructor(
      @inject('OfferRepository')
      private offerRepository: IOfferRepository,
   ) {}

   public async execute({
      limit,
      page,
   }: IRequest): Promise<IEnableOffersPagination> {
      const offers = await this.offerRepository.findEnableOffers({
         limit: limit || 10,
         page: page || 1,
      });

      return offers;
   }
}
