import { createUser, getUsers } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const users = await getUsers();
	return json({ users });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	try {
		const newUser = await createUser(data);
		return json(newUser);
	} catch (err: any) {
		if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
			error(400, 'Este email já está cadastrado.');
		} else {
			console.error('Erro inesperado:', err);
			error(500, 'Erro ao criar usuário.');
		}
	}
};
