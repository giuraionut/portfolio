import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Prisma client singleton
 * Ensures a single instance of PrismaClient across the application
 * to prevent exhausting database connections in development.
 */
const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
