import IOffer from '@modules/offers/models/IOffer';

export default interface IEnableOffersPagination {
   total: number;
   pages: number;
   offers: IOffer[];
}
