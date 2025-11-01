import "server-only";

import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc";
import db from "@/db";
import { advocates } from "@/db/schema";

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
  advocates: baseProcedure.query(async () => {
    return await db.select().from(advocates);
  }),
});

export type AppRouter = typeof appRouter;
