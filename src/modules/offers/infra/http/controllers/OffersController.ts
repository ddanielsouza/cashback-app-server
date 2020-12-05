import CreateOfferService from '@modules/offers/services/CreateOfferService';
import DeleteOfferService from '@modules/offers/services/DeleteOfferService';
import GetOfferByIdService from '@modules/offers/services/GetOfferByIdService';
import GetOffersService from '@modules/offers/services/GetOffersService';
import UpdateOfferService from '@modules/offers/services/UpdateOfferService';
import validateRequest from '@shared/decorators/validateRequest';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import createOfferSchema from '../../yup/validations/createOffer.schema';

export default class OffersController {
   @validateRequest({ localRequest: 'body', schema: createOfferSchema })
   public async create(request: Request, response: Response): Promise<Response> {
      const {
         advertiser_name,
         url,
         description,
         starts_at,
         ends_at,
         premium,
      } = request.body;

      const createOffer = container.resolve(CreateOfferService);

      const offer = await createOffer.execute({
         advertiser_name,
         url,
         description,
         starts_at: new Date(starts_at),
         ends_at: ends_at ? new Date(ends_at) : undefined,
         premium: !!premium,
      });

      return response.status(201).json(offer);
   }

   @validateRequest({ localRequest: 'body', schema: createOfferSchema })
   public async update(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;
      const {
         advertiser_name,
         url,
         description,
         starts_at,
         ends_at,
         premium,
      } = request.body;

      const updateOfferService = container.resolve(UpdateOfferService);

      const offer = await updateOfferService.execute({
         id,
         advertiser_name,
         url,
         description,
         starts_at: new Date(starts_at),
         ends_at: ends_at ? new Date(ends_at) : undefined,
         premium: !!premium,
      });

      return response.status(200).json(offer);
   }

   public async index(request: Request, response: Response): Promise<Response> {
      const getOffers = container.resolve(GetOffersService);

      const offers = await getOffers.execute();

      return response.json(classToClass(offers));
   }

   public async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;
      const deleteOffer = container.resolve(DeleteOfferService);

      await deleteOffer.execute({ id });

      return response.json();
   }

   public async getOfferById(
      request: Request,
      response: Response,
   ): Promise<Response> {
      const { id } = request.params;
      const getOfferById = container.resolve(GetOfferByIdService);

      const offer = await getOfferById.execute({ id });

      return response.json(offer);
   }
}
