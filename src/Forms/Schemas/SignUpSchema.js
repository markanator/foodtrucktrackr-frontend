import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
  first_name: yup.string().lowercase().min(2, 'Name is too short!').required(),
  last_name: yup.string().lowercase().min(2, 'Name is too short!').required(),
  username: yup
    .string()
    .lowercase()
    .min(5, 'Username is too short!')
    .required(),
  email: yup.string().lowercase().email().required(),
  user_role: yup
    .string()
    .oneOf(['diner', 'operator'])
    .required('A user role is required!'),
  password: yup.string().min(8, 'Minimum 8 characters requried!').required(),
});
