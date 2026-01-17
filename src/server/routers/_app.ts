import { z } from 'zod'
import { router, publicProcedure } from '@/lib/trpc/server'

// Example router to demonstrate the pattern
export const appRouter = router({
    // Health check endpoint
    health: publicProcedure.query(() => {
        return { status: 'ok', timestamp: new Date().toISOString() }
    }),

    // Example with input validation
    hello: publicProcedure
        .input(z.object({ name: z.string().optional() }))
        .query(({ input }) => {
            return { greeting: `Hello ${input.name ?? 'World'}!` }
        }),
})

// Export type for client
export type AppRouter = typeof appRouter
