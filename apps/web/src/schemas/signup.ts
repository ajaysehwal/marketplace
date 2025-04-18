import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['BUYER', 'SELLER']),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
