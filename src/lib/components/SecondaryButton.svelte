<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	const props: {
		text: string;
		type?: 'button' | 'submit' | 'reset';
		class?: ClassValue;
		onclick?: () => void;
	} = $props();
</script>

<button
	type={props.type ?? 'button'}
	class={[
		'cursor-pointer',
		'rounded-2xl',
		'border',
		'border-gray-800',
		'px-4',
		'py-2.25',
		'text-white',
		'transition',
		'duration-200',
		'ease-in-out',
		'hover:bg-gray-800',
		props.class
	]}
	onclick={props.onclick}>{props.text}</button
>
