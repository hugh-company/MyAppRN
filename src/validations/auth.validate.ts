import {t} from 'i18next';
import {z} from 'zod';

const usernameValidation = z
  .string()
  .regex(/^[a-zA-Z0-9_]+$/, {message: t('validate.validate_username')})
  .min(1, {message: t('validate.validate_username')});

const passwordValidation = z
  .string()
  .min(6, {message: t('validate.password_req')});

const fullnameValidation = z
  .string()
  .regex(/^[\p{L} ]+$/u, {message: t('validate.validate_fullname')})
  .min(1, {message: t('validate.validate_fullname')});

export const loginSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
});
export type loginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: usernameValidation,
    fullname: fullnameValidation,
    email: z
      .string()
      .min(1, t('validate.email_req'))
      .email(t('validate.validate_email')),
    password: passwordValidation,
    confirmPassword: z
      .string()
      .min(6, t('validate.validate_confirmPassword_min')),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: t('validate.check_password'),
    path: ['confirmPassword'],
  });
export type registerFormData = z.infer<typeof registerSchema>;
