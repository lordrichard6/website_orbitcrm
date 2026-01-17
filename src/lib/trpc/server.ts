import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'

// Context type for tRPC procedures
export interface Context {
    // Add user session, database client, etc.
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        }
    },
})

// Export reusable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
export const createCallerFactory = t.createCallerFactory
