import "server-only";

import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc";
import { advocateData } from "@/db/seed/advocates";

export const appRouter = createTRPCRouter({
  greeting: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
  advocates: baseProcedure.query(() => {
    return advocateData;
  }),
});

export type AppRouter = typeof appRouter;
