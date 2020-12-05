import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOfferRepository from '../repositories/IOfferRepository';

interface IRequest {
   id: string;
}

@injectable()
export default class DeleteOfferService {
   constructor(
      @inject('OfferRepository')
      private offerRepository: IOfferRepository,
   ) {}

   public async execute({ id }: IRequest): Promise<void> {
      const offer = await this.offerRepository.findById(id);

      if (!offer) {
         throw new AppError('Offer does not found', 404);
      }

      await this.offerRepository.deleteById(id);
   }
}
