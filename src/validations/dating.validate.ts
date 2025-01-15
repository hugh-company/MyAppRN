import {t} from 'i18next';
import {z} from 'zod';

export const createProfileSchema = z.object({
  fullname: z.string().min(1, {message: t('validate.validate_fullname')}),
  avatar: z.string().min(1, {message: t('validate.validate_avatar')}),
  about_me: z.string().min(1, {message: t('validate.validate_about_me')}),
  birthday: z.string().min(1, {message: t('validate.validate_birthday')}),
  gender: z.string().min(1, {message: t('validate.validate_gender')}),
  // phone
  phone: z.object({
    code: z.string().min(1, {message: t('validate.validate_country')}),
    number: z.string().min(1, {message: t('validate.validate_phone_min')}),
  }),
  galleries: z
    .array(z.string())
    .min(1, {message: t('validate.validate_galleries')}),
  job: z.string().min(1, {message: t('validate.validate_job')}),
});
export type createProfileFormData = z.infer<typeof createProfileSchema>;
