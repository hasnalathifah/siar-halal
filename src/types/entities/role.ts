export const ROLE = ['admin', 'user'] as const;

export type Role = (typeof ROLE)[number];
