import 'reflect-metadata';
import '@shared/container';

import { container } from 'tsyringe';
import CreateOfferService from '@modules/offers/services/CreateOfferService';
import AppError from '@shared/errors/AppError';
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
      const offer = await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'Google 50% desconto',
         starts_at: new Date('2019-01-01'),
         ends_at: new Date(),
         premium: true,
      });

      expect(offer.advertiser_name).toBe('Google.com');
      expect(offer).toHaveProperty('id');
   });

   it('should not be able to create offer without advertiser name', async () => {
      await expect(
         createOffer.execute({
            advertiser_name: '',
            url: 'https://google.com.br',
            description: 'Google 50% desconto',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create offer without url', async () => {
      await expect(
         createOffer.execute({
            advertiser_name: 'Google.com',
            url: '',
            description: 'Google 50% desconto',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create offer without description', async () => {
      await expect(
         createOffer.execute({
            advertiser_name: 'Google.com',
            url: 'https://google.com.br',
            description: '',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create offer without date starts', async () => {
      const data: any = {
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'ddd',
         starts_at: null,
         premium: true,
      };

      await expect(createOffer.execute(data)).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create offer without a valid URL', async () => {
      await expect(
         createOffer.execute({
            advertiser_name: 'Google.com',
            url: 'google',
            description: 'teste',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create offer if date start is less than the date end ', async () => {
      await expect(
         createOffer.execute({
            advertiser_name: 'Google.com',
            url: 'https://google.com.br',
            description: 'teste',
            starts_at: new Date(),
            ends_at: new Date('2019-01-01'),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create offer if duplicate advertiser name', async () => {
      await createOffer.execute({
         advertiser_name: 'Google.com',
         url: 'https://google.com.br',
         description: 'teste',
         starts_at: new Date(),
         premium: true,
      });

      await expect(
         createOffer.execute({
            advertiser_name: 'Google.com',
            url: 'https://google.com.br',
            description: 'teste',
            starts_at: new Date(),
            premium: true,
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
