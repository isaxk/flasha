<script lang="ts">
	import { cardColors } from "$lib/data/cardcolors";
	import { flyAndScale } from "$lib/transition";
	import { fly, scale, slide } from "svelte/transition";

	export let front: string;
	export let back: string;
	export let color: number = 0;
	export let i:number;
	export let total:number;
	export let showBack: boolean;
</script>

<div
out:fly={{x:-500, duration: 500}}
in:scale={{start: 0.7, opacity: 0, duration: 500, delay: 100}}
	class="absolute top-0 left-0 w-full h-full flex-grow flex items-center justify-center text-2xl text-zinc-800 bg-neutral-800"
	style:background-color={cardColors[color]}
>
	<div class="absolute top-0 left-0 px-4 py-2 text-neutral-600 text-[15px]">{i+1}/{total}</div>
	<div class="min-w-96 px-5 text-center">
		<div class="{showBack?'font-normal' : 'font-semibold'} transition-all duration-300">{front}</div>
		{#if showBack}
        <div class="h-0.5 my-3 bg-neutral-700"></div>
			<div class="font-semibold" in:flyAndScale out:slide>{back}</div>
		{/if}
	</div>
</div>
