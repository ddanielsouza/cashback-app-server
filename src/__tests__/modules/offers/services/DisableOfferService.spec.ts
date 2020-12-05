import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import DisableOfferService from '@modules/offers/services/DisableOfferService';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let disableOffer: DisableOfferService;

describe('DisableOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      disableOffer = container.resolve(DisableOfferService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to disable the offer', async () => {
      expect({});
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date(),
         premium: true,
      });

      const offerUpdated = await disableOffer.execute({
         id: offer.id.toHexString(),
      });

      expect(offerUpdated.disable).toBe(true);
   });
});
