import {t} from 'i18next';
import {z} from 'zod';

const passwordValidation = z
  .string()
  .min(6, {message: t('validate.password_req')});

const fullnameValidation = z
  .string()
  .regex(/^[\p{L} ]+$/u, {message: t('validate.validate_fullname')})
  .min(1, {message: t('validate.validate_fullname')});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, t('validate.email_req'))
    .email(t('validate.validate_email')),
  password: passwordValidation,
});
export type loginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstname: z
      .string()
      .regex(/^[\p{L} ]+$/u, {message: t('validate.validate_firstname')})
      .min(1, {message: t('validate.validate_firstname')}),
    lastname: z
      .string()
      .regex(/^[\p{L} ]+$/u, {message: t('validate.validate_lastname')})
      .min(1, {message: t('validate.validate_lastname')}),
    // fullname: fullnameValidation,
    email: z
      .string()
      .min(1, t('validate.email_req'))
      .email(t('validate.validate_email')),
    password: passwordValidation,

    password2: z.string().min(6, t('validate.validate_confirmPassword_min')),
    address1: z.string().min(1, t('validate.validate_address')),
    country: z.string().min(1, t('validate.validate_country')),
    phonenumber: z
      .string()
      .regex(/^\d+$/, {message: t('validate.validate_phone_number')})
      .min(10, t('validate.validate_phone_min')),
    accountType: z.enum(['individual', 'company'], {
      errorMap: () => ({message: t('validate.validate_accountType')}),
    }),
    personalId: z.string().min(1, t('validate.validate_personalId')),
    companyTax: z.string().optional(),
    companyName: z.string().optional(),
    affiliateCode: z.string().optional(),
  })
  .refine(
    data =>
      data.accountType === 'individual' ||
      (data.accountType === 'company' && data.companyTax && data.companyName),
    {
      message: t('validate.validate_company_fields'),
      path: ['companyTax', 'companyName'],
    },
  )
  .refine(data => data.password === data.password2, {
    message: t('validate.check_password'),
    path: ['password2'],
  });
export type registerFormData = z.infer<typeof registerSchema>;

// forgot password
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, t('validate.email_req'))
    .email(t('validate.validate_email')),
});
export type forgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
