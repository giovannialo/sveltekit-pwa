import { deleteUser, updateUser } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, params }) => {
	const data = await request.json();
	const userId = Number(params.id);

	try {
		const updatedUser = await updateUser(userId, data);

		if (!updatedUser.length) {
			error(404, 'Usuário não encontrado.');
		}

		return json(updatedUser);
	} catch (err: any) {
		if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
			error(400, 'Email já cadastrado.');
		} else {
			console.error('Erro inesperado:', err);
			error(500, 'Erro ao atualizar usuário.');
		}
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	await deleteUser(Number(params.id));
	return new Response(null, { status: 204 });
};
