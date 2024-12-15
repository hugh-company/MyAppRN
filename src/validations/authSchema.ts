import {z} from 'zod';

// setup info user
export const setupInfoUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Vui lòng nhập tên')
    .regex(
      /^[a-zA-Z\s\u00C0-\u1EF9]+$/,
      'Tên chỉ bao gồm chữ cái , không được chứa ký tự đặc biệt',
    ),
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không đúng định dạng'),
});

export type SetupInfoUserFormData = z.infer<typeof setupInfoUserSchema>;
// sign up
export const signUpSchema = z.object({
  phone: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại')
    .regex(/^[0-9]+$/, 'Số điện thoại không đúng định dạng'),
    // validate phone viet nam

  code: z.string().optional(),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
// verify code
export const verifyCodeSchema = z.object({
  code: z.string().min(1, 'Vui lòng nhập mã xác thực'),
});
export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;
