<script lang="ts">
	let { type, value = $bindable() } = $props();
</script>

<input
	{type}
	bind:value
	class="mt-1 block w-full rounded-2xl border-gray-800 bg-transparent focus:border-sky-300"
	placeholder="exemplo@triplos.com.br"
	required
/>
