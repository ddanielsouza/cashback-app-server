import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import GetEnablesOffersService from '@modules/offers/services/GetEnablesOffersService';
import EnableOfferService from '@modules/offers/services/EnableOfferService';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let getEnablesOffers: GetEnablesOffersService;
let enableOffer: EnableOfferService;

describe('CreateOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      getEnablesOffers = container.resolve(GetEnablesOffersService);
      enableOffer = container.resolve(EnableOfferService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to get active offers', async () => {
      expect({});
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      await enableOffer.execute({
         id: offer.id.toHexString(),
      });

      const paginate = await getEnablesOffers.execute({ limit: 10, page: 1 });
      expect(paginate.total).toBe(1);
      expect(paginate.pages).toBe(1);
      expect(paginate.offers.length).toBe(1);
   });
});
