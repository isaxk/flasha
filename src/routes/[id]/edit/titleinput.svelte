<script lang="ts">
	import _ from "lodash";
	import { createEventDispatcher } from "svelte";
	import { fade, fly } from "svelte/transition";

	export let value: string;

	const dispatch = createEventDispatcher();

	let isFocused: boolean = false;

	const handleChange = _.debounce(() => {
		dispatch("change", value);
	}, 500);
</script>

{#if isFocused}
	<form
		class="text-2xl flex-grow inset-0 bg-zinc-50 h-full absolute z-10 w-full flex items-center"
		in:fly={{ x: -50 }}
		out:fly={{ x: -50 }}
		on:submit|preventDefault={() => (isFocused = false)}
	>
		<input
			type="text"
			on:change={handleChange}
			autofocus
			class="p-1 w-full bg-transparent focus:bg-white overflow-x-clip text-wrap break-words break-before-all drop-shadow"
			bind:value
			on:blur={() => (isFocused = false)}
		/>
	</form>
{/if}
<button
	class="w-full p-1 text-left text-3xl font-medium"
	on:click={() => (isFocused = true)}>{value}</button
>
