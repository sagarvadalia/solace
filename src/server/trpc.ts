import "server-only";

import { initTRPC } from "@trpc/server";

export const createTRPCContext = async () => {
  // Define your context here
  return {};
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
