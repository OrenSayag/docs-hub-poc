import { z } from 'zod';

export const updateDocumentSchema = z.object({
  name: z.string().optional(),
  content: z.string().optional(),
});

export const createDocumentSchema = z.object({
  name: z.string(),
  content: z.string(),
  parentId: z.string(),
});
