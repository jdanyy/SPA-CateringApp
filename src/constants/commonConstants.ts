export const TIMEOUT_MS_DURATION = 1000;

export type Role = 'ADMIN' | 'CHEF' | 'CLIENT';

export type Scope = Role | 'Authentication' | '*';
