import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import UpdateOfferService from '@modules/offers/services/UpdateOfferService';
import AppError from '@shared/errors/AppError';
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
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      const offer = await updateOffer.execute({
         id: offerCreated.id,
         advertiser_name: 'Google.com.br',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         ends_at: new Date(),
         premium: true,
      });

      expect(offer.advertiser_name).toBe('Google.com.br');
   });

   it('should not be able to update offer without advertiser name', async () => {
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      await expect(
         updateOffer.execute({
            id: offerCreated.id,
            advertiser_name: '',
            url: 'https://google.com.br',
            description: 'Google 50% desconto',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update offer without url', async () => {
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      await expect(
         updateOffer.execute({
            id: offerCreated.id,
            advertiser_name: 'Google.com',
            url: '',
            description: 'Google 50% desconto',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update offer without description', async () => {
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      await expect(
         updateOffer.execute({
            id: offerCreated.id,
            advertiser_name: 'Google.com',
            url: 'https://google.com.br',
            description: '',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update offer without date starts', async () => {
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      const data: any = {
         id: offerCreated.id,
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'ddd',
         starts_at: null,
         premium: true,
      };

      await expect(updateOffer.execute(data)).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update offer without a valid URL', async () => {
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      await expect(
         updateOffer.execute({
            id: offerCreated.id,
            advertiser_name: 'Google.com',
            url: 'google',
            description: 'teste',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update offer if date start is less than the date end ', async () => {
      const offerCreated = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         premium: true,
      });

      await expect(
         updateOffer.execute({
            id: offerCreated.id,
            advertiser_name: 'Google.com',
            url: 'https://google.com.br',
            description: 'teste',
            starts_at: new Date(),
            ends_at: new Date('2019-01-01'),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update offer if duplicate advertiser name', async () => {
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'teste',
         starts_at: new Date(),
         premium: true,
      });

      await createOffer.execute({
         advertiser_name: 'Google.com.br',
         url: 'https://google.com.br',
         description: 'teste',
         starts_at: new Date(),
         premium: true,
      });

      await expect(
         updateOffer.execute({
            id: offer.id,
            advertiser_name: 'Google.com.br',
            url: 'https://google.com.br',
            description: 'teste',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
