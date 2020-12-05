import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import UpdateOfferService from '@modules/offers/services/UpdateOfferService';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let updateOffer: UpdateOfferService;

describe('CreateOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      updateOffer = container.resolve(UpdateOfferService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to update the offer', async () => {
      expect({});
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      const offer = await updateOffer.execute({
         id: offerCreated.id.toHexString(),
         advertiser_name: 'Google.com.br',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      expect(offer.advertiser_name).toBe('Google.com.br');
   });
});
