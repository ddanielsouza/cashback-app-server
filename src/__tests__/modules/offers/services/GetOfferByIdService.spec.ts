import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import GetOfferByIdService from '@modules/offers/services/GetOfferByIdService';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let getOfferById: GetOfferByIdService;

describe('GetOfferById', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      getOfferById = container.resolve(GetOfferByIdService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to get offer by id', async () => {
      expect({});
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      const foundOffer = await getOfferById.execute({
         id: offer.id.toHexString(),
      });

      expect(foundOffer.advertiser_name).toBe('Google.com');
   });
});
