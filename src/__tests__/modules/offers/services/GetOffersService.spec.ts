import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import GetOffersService from '@modules/offers/services/GetOffersService';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let getOffers: GetOffersService;

describe('CreateOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      getOffers = container.resolve(GetOffersService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to get all offers', async () => {
      await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      const offers = await getOffers.execute();
      expect(offers.length).toBe(1);

      expect(offers[0].advertiser_name).toBe('Google.com');
   });
});
