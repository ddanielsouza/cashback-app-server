import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import DeleteOfferService from '@modules/offers/services/DeleteOfferService';
import GetOfferByIdService from '@modules/offers/services/GetOfferByIdService';
import AppError from '@shared/errors/AppError';
import * as connection from '../../../utils/connection';

let createOffer: CreateOfferService;
let deleteOffer: DeleteOfferService;
let getOfferById: GetOfferByIdService;

describe('DeleteOffer', () => {
   beforeAll(async () => {
      await connection.create();
   });

   afterAll(async () => {
      await connection.close();
   });

   beforeEach(async () => {
      createOffer = container.resolve(CreateOfferService);
      deleteOffer = container.resolve(DeleteOfferService);
      getOfferById = container.resolve(GetOfferByIdService);
   });

   afterEach(async () => {
      await connection.clear();
   });

   it('should be able to delete offer', async () => {
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date(),
         premium: true,
      });

      await deleteOffer.execute({ id: offer.id });

      await expect(getOfferById.execute({ id: offer.id })).rejects.toBeInstanceOf(
         AppError,
      );
   });

   it('should be able to throw an exception if not found offer', async () => {
      await expect(
         deleteOffer.execute({ id: 'non-exist-offer' }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
