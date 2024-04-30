import { z } from 'zod';

export const updateDocumentSchema = z.object({
  name: z.string().optional(),
  content: z.string().optional(),
});
