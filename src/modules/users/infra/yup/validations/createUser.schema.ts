import * as Yup from 'yup';

const createUserSchema = Yup.object().shape({
   name: Yup.string().required(),
   email: Yup.string().required(),
   password: Yup.string().required(),
});

export default createUserSchema;
