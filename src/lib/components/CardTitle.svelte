<script lang="ts">
	let { text, subtitle = '' } = $props();
</script>

<div class="mb-4">
	<h1 class="text-lg font-semibold">{text}</h1>
	{#if subtitle}
		<p class="text-gray-400">{subtitle}</p>
	{/if}
</div>
