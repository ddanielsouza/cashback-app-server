import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;

describe('CreateOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to create offer', async () => {
      expect({});
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date(),
         premium: true,
      });

      expect(offer.advertiser_name).toBe('Google.com');
      expect(offer).toHaveProperty('id');
   });
});
