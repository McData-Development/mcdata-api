import type { Prisma } from '@prisma/client';

export type UserWithAccountsAndBadges = Prisma.UserGetPayload<{ include: { accounts: true, badges: true } }>;
