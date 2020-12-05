import DisableOfferService from '@modules/offers/services/DisableOfferService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DisableOffersController {
   public async disableOffer(
      request: Request,
      response: Response,
   ): Promise<Response> {
      const { id } = request.params;

      const disableOffer = container.resolve(DisableOfferService);

      const offer = await disableOffer.execute({ id });

      return response.json(classToClass(offer));
   }
}
