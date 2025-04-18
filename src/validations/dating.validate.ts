import {t} from 'i18next';
import {z} from 'zod';

export const createProfileSchema = z.object({
  fullname: z.string().min(1, {message: t('validate.validate_fullname')}),
  avatar: z.string().min(1, {message: t('validate.validate_avatar')}),
  about_me: z.string().optional(),
  birthday: z.string().min(1, {message: t('validate.validate_birthday')}),
  gender: z.string().min(1, {message: t('validate.validate_gender')}),
  // phone
  phone: z.object({
    code: z.string().min(1, {message: t('validate.validate_country')}),
    number: z.string().min(1, {message: t('validate.validate_phone_min')}),
  }),
  rel_status: z.string().optional(),
  galleries: z
    .array(z.string())
    .min(1, {message: t('validate.validate_galleries')}),
  job: z.string().optional(),
  zalo: z
    .string()
    .optional()
    .refine(val => !val || !val.includes('https://'), {
      message: t('validate.no_url_prefix'),
    }),
  facebook: z
    .string()
    .optional()
    .refine(val => !val || !val.includes('https://'), {
      message: t('validate.no_url_prefix'),
    }),
  instagram: z
    .string()
    .optional()
    .refine(val => !val || !val.includes('https://'), {
      message: t('validate.no_url_prefix'),
    }),
});
export type createProfileFormData = z.infer<typeof createProfileSchema>;
