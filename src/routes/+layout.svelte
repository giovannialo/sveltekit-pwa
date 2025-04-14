<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
</script>

<div class="py-12">
	<nav
		class="mx-auto flex max-w-60 items-center justify-between rounded-full border border-gray-800 px-5 py-2"
	>
		<a
			href="/"
			class="text-sm font-medium text-gray-300 hover:text-white"
			aria-current={page.url.pathname === '/'}>Home</a
		>
		<a
			href="/users"
			class="text-sm font-medium text-gray-300 hover:text-white"
			aria-current={page.url.pathname === '/users'}>Usuários</a
		>
		<div class="h-4 w-px bg-gray-800"></div>
		<span class="text-sm font-medium text-green-300">Online</span>
	</nav>

	<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>

<style>
	[aria-current='true'] {
		color: var(--color-sky-300);
	}
</style>
