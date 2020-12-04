import * as Yup from 'yup';

const createSessionSchema = Yup.object().shape({
   email: Yup.string().required(),
   password: Yup.string().required(),
});

export default createSessionSchema;
