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
		'bg-sky-300',
		'px-4',
		'py-2.25',
		'font-semibold',
		'text-gray-950',
		'duration-200',
		'ease-in-out',
		'hover:bg-sky-200',
		props.class
	]}
	onclick={props.onclick}>{props.text}</button
>
