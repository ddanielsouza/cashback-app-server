import IOffer from '../models/IOffer';
import IEnableOffersPagination from './dtos/IEnableOffersPagination';
import IFindEnableOffersDTO from './dtos/IFIndEnableOffersDTO';

export default interface IOfferRepository {
   create(data: Omit<IOffer, 'id'>): Promise<IOffer>;
   findById(id: string): Promise<IOffer | undefined>;
   findOne(data: Partial<IOffer>): Promise<IOffer | undefined>;
   find(data?: Partial<IOffer> | undefined): Promise<IOffer[]>;
   updateById(id: string, data: Partial<IOffer>): Promise<IOffer>;
   deleteById(id: string): Promise<void>;
   findEnableOffers(data: IFindEnableOffersDTO): Promise<IEnableOffersPagination>;
   findByAdvertiserNameIgnoreCase(name: string): Promise<IOffer | undefined>;
}
