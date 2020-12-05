import * as Yup from 'yup';

const createOfferSchema = Yup.object().shape({
   advertiser_name: Yup.string().required(),
   url: Yup.string()
      .required()
      .test('url_test', 'URL is invalid', value => {
         if (!value) return false;

         const pattern = new RegExp(
            '^(https?:\\/\\/)?' +
               '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
               '((\\d{1,3}\\.){3}\\d{1,3}))' +
               '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
               '(\\?[;&a-z\\d%_.~+=-]*)?' +
               '(\\#[-a-z\\d_]*)?$',
            'i',
         );

         return pattern.test(value.trim());
      }),
   description: Yup.string().required(),
   starts_at: Yup.date().required(),
   premium: Yup.boolean(),
});

export default createOfferSchema;
