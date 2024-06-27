<script lang="ts">
	import { quintInOut, quintOut } from "svelte/easing";
	import { fly, scale, slide } from "svelte/transition";

	export let front: string;
	export let back: string;
	export let color:string;
	export let showBack: boolean;
</script>

<div
	class="absolute top-0 left-0 min-h-96 bg-yellow-50 w-full h-full p-4 flex items-center justify-center rounded-md drop-shadow px-10"
	style:background-color={color}
	in:scale={{ duration: 300, start: 0.8, delay: 100 }}
	out:fly={{ duration: 300, x: -50 }}
>
	<div class="text-2xl text-center flex flex-col gap-5 w-full sm:w-60">
		<div class="font-medium">{front}</div>
		{#if showBack}
		<div class="h-0.5 bg-gray-300 w-full rounded-full"></div>
			<div in:slide={{easing: quintOut}}>{back}</div>
		{/if}
	</div>
</div>
