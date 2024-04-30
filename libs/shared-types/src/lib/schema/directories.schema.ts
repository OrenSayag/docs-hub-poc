import { z } from 'zod';

export const updateDirectorySchema = z.object({
  name: z.string(),
});

export const createDirectorySchema = z.object({
  name: z.string(),
  parentId: z.string(),
});
