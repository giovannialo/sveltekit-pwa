import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import type { InsertAddress, InsertUser } from './types';
import { eq } from 'drizzle-orm';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: env.DATABASE_URL });

export const db = drizzle(client, { schema });

// User CRUD operations
export async function getUsers() {
	return await db.select().from(schema.users);
}

export async function createUser(data: InsertUser) {
	return await db.insert(schema.users).values(data).returning();
}

export async function updateUser(id: number, data: Partial<InsertUser>) {
	return await db
		.update(schema.users)
		.set({ ...data, updatedAt: new Date().toISOString() })
		.where(eq(schema.users.id, id))
		.returning();
}

export async function deleteUser(id: number) {
	await db.delete(schema.users).where(eq(schema.users.id, id));
}
