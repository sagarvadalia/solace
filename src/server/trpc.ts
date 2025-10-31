import 'server-only';

import { initTRPC } from '@trpc/server';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  // Define your context here
  return {};
});

const t = initTRPC.context<Awaited<ReturnType<ReturnType<typeof createTRPCContext>>>>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

