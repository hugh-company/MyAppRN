import {TaskColor} from '@types';
import {z} from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.string().optional(),

  deadline: z.string().min(1, 'Deadline is required'),
  priority: z.string().optional(),
  color: z.string().optional() as z.ZodType<TaskColor>,
  images: z.array(z.string()).optional(),
  background: z.string().optional(),
  id: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
