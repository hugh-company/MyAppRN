import {t} from 'i18next';
import {z} from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, t('validate.email_req'))
    .email(t('validate.validate_email')),
  password: z.string().min(1, t('validate.password_req')),
});
export type loginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, {message: t('validate.validate_name')})
    .max(50, {message: t('validate.validate_max_name')}),
  email: z
    .string()
    .min(1, t('validate.email_req'))
    .email(t('validate.validate_email')),
  password: z
    .string()
    .min(1, t('validate.password_req'))
    .min(8, {message: t('validate.password_req')})
    .max(32, {message: t('validate.password_max')}),
  confirmPassword: z
    .string()
    .min(1, t('validate.validate_confirmPassword_min'))
    .max(32, {message: t('validate.validate_confirmPassword_max')})
    .superRefine(({password, confirmPassword}: any, ctx) => {
      if (password !== confirmPassword) {
        console.log('sssss');
      }
    }),
});
export type registerFormData = z.infer<typeof registerSchema>;
