import 'server-only';

import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../trpc';

export const appRouter = createTRPCRouter({
  greeting: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;

