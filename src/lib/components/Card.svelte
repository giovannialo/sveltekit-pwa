<script lang="ts">
	let { children } = $props();
</script>

<div class="rounded-3xl border border-gray-800 p-4">
	{@render children()}
</div>
