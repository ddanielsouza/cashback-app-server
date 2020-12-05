import EnableOfferService from '@modules/offers/services/EnableOfferService';
import GetEnablesOffersService from '@modules/offers/services/GetEnablesOffersService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class EnableOffersController {
   public async enableOffer(
      request: Request,
      response: Response,
   ): Promise<Response> {
      const { id } = request.params;

      const enableOffer = container.resolve(EnableOfferService);

      const offer = await enableOffer.execute({ id });

      return response.json(classToClass(offer));
   }

   public async index(request: Request, response: Response): Promise<Response> {
      const { limit, page } = request.query;
      const getEnablesOffers = container.resolve(GetEnablesOffersService);

      const offers = await getEnablesOffers.execute({
         limit: Number(limit),
         page: Number(page),
      });

      return response.json(classToClass(offers));
   }
}
