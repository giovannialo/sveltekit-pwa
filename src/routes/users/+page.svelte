<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CardTitle from '$lib/components/CardTitle.svelte';
	import FieldLabel from '$lib/components/FieldLabel.svelte';
	import MainHeader from '$lib/components/MainHeader.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import type { SelectUser } from '$lib/server/db/types';
	import { onMount } from 'svelte';

	let users: SelectUser[] = $state([]);
	let name = $state('');
	let email = $state('');
	let editingId: number | null = $state(null);

	async function loadUsers() {
		const response = await fetch(`/users`);
		users = (await response.json()).users;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const body = { name, email };

		if (editingId) {
			const response = await fetch(`/users/${editingId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			const data = await response.json();

			if (!response.ok) {
				if (response.status === 404) {
					users = users.filter((user) => user.id !== editingId);
					handleReset();
				}

				alert(data.message);
				return;
			}

			users = users.map((user) => (user.id === editingId ? data[0] : user));
		} else {
			const response = await fetch(`/users`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			const data = await response.json();

			if (!response.ok) {
				alert(data.message);
				return;
			}

			users.push(data[0]);
		}

		handleReset();
	}

	function handleEdit(user: SelectUser) {
		name = user.name;
		email = user.email;
		editingId = user.id;
	}

	async function handleDelete(userId: number) {
		await fetch(`/users/${userId}`, { method: 'DELETE' });
		users = users.filter((user) => user.id !== userId);

		if (editingId === userId) {
			handleReset();
		}
	}

	function handleReset() {
		name = '';
		email = '';
		editingId = null;
	}

	onMount(loadUsers);
</script>

<MainHeader text="Usuários" />

<div class="flex flex-col gap-4 sm:gap-6 md:flex-row lg:gap-8">
	<div class="flex-1">
		<Card>
			<CardTitle text="Cadastrar Usuário" />
			<form onsubmit={handleSubmit}>
				<label class="block">
					<FieldLabel text="Nome" />
					<TextField type="text" bind:value={name} />
				</label>
				<label class="mt-4 block">
					<FieldLabel text="Email" />
					<TextField type="email" bind:value={email} />
				</label>
				<div class="mt-4 flex items-center gap-4">
					<PrimaryButton type="submit" text="Salvar" class="w-full" />
					<SecondaryButton type="reset" text="Limpar" onclick={handleReset} />
				</div>
			</form>
		</Card>
	</div>
	<div class="flex-1 md:w-86 md:flex-none lg:w-96">
		<Card>
			<CardTitle text={'Lista de Usuários (' + users.length + ')'} />
			<ul>
				{#if users.length === 0}
					<li class="text-gray-500">Nenhum usuário encontrado.</li>
				{:else}
					{#each users as user (user.id)}
						<li class="border-b border-gray-800 py-2 last:border-b-0 last:pb-0">
							<span class="block text-sm font-medium">{user.name}</span>
							<span class="block text-xs text-gray-400">{user.email}</span>
							<div class="mt-2 flex items-center gap-2">
								<button
									type="button"
									class="cursor-pointer text-xs text-sky-300 hover:underline"
									onclick={() => handleEdit(user)}>Editar</button
								>
								<div class="h-4 w-px bg-gray-800"></div>
								<button
									type="button"
									class="cursor-pointer text-xs text-red-300 hover:underline"
									onclick={() => handleDelete(user.id)}>Excluir</button
								>
							</div>
						</li>
					{/each}
				{/if}
			</ul>
		</Card>
	</div>
</div>
