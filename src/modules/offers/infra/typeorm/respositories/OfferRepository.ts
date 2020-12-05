import IOffer from '@modules/offers/models/IOffer';
import IEnableOffersPagination from '@modules/offers/repositories/dtos/IEnableOffersPagination';
import IFindEnableOffersDTO from '@modules/offers/repositories/dtos/IFIndEnableOffersDTO';
import IOfferRepository from '@modules/offers/repositories/IOfferRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Offer from '../entities/Offer';

class OffersRepository implements IOfferRepository {
   private ormRepository: Repository<Offer>;

   constructor() {
      this.ormRepository = getRepository(Offer);
   }

   public async findOne(data: Partial<IOffer>): Promise<IOffer | undefined> {
      const offer = await this.ormRepository.findOne(data);

      return offer;
   }

   public async find(data: Partial<IOffer> | undefined): Promise<IOffer[]> {
      const offers = await this.ormRepository.find(data);

      return offers;
   }

   public async findById(id: string): Promise<Offer | undefined> {
      const offer = await this.ormRepository.findOne(id);

      return offer;
   }

   public async create(data: Omit<IOffer, 'id'>): Promise<Offer> {
      const offer = this.ormRepository.create(data);

      await this.ormRepository.save(offer);

      return offer;
   }

   public async updateById(id: string, data: Partial<IOffer>): Promise<Offer> {
      const offer = await this.ormRepository.findOne(id);

      if (!offer) {
         throw new AppError('Offer does not found');
      }

      Object.assign(offer, data);

      await this.ormRepository.save(offer);

      return offer;
   }

   public async deleteById(id: string): Promise<void> {
      await this.ormRepository.delete(id);
   }

   public async findEnableOffers({
      limit,
      page,
   }: IFindEnableOffersDTO): Promise<IEnableOffersPagination> {
      const skip = (page - 1) * limit;
      const where = {
         disable: false,
         starts_at: { $lte: new Date() },
         $or: [
            { ends_at: { $gt: new Date() } },
            { ends_at: { $exists: false } },
            { ends_at: null },
         ],
      };

      const allOffers = await this.ormRepository.find({
         where,
      });

      const offers = await this.ormRepository.find({
         skip,
         take: limit,
         where,
      });

      return {
         total: allOffers.length,
         pages: Math.ceil(allOffers.length / limit),
         offers,
      };
   }
}

export default OffersRepository;
