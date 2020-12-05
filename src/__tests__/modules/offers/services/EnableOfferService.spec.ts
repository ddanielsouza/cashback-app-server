import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import EnableOfferService from '@modules/offers/services/EnableOfferService';
import AppError from '@shared/errors/AppError';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let enableOffer: EnableOfferService;

describe('EnableOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      enableOffer = container.resolve(EnableOfferService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to enable the offer', async () => {
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date(),
         premium: true,
      });

      const offerUpdated = await enableOffer.execute({
         id: offer.id,
      });

      expect(offerUpdated.disable).toBe(false);
   });

   it('should be able to throw an exception if not found offer', async () => {
      await expect(
         enableOffer.execute({ id: 'non-exist-offer' }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
