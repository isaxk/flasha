<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { fade, scale } from "svelte/transition";
	import { Doc } from "sveltefire";
	import ChevronLeft from "virtual:icons/lucide/chevron-left";
	import ChevronRight from "virtual:icons/lucide/chevron-right";
	import Eye from "virtual:icons/lucide/eye";
	import Pencil from "virtual:icons/lucide/pencil-line";
	import Flashcard from "./flashcard.svelte";
	import { docStore, collectionStore } from "sveltefire";
	import { firestore } from "$lib/firebase";
	import type { Stack, Cards } from "$lib/types";
	import _ from "lodash";

	export let data;

	let currentCard: number = 0;
	let showBack: boolean = false;

	function flip() {
		showBack = true;
	}
	function nextCard() {
		showBack = false;
		currentCard++;
	}
	function reset() {
		currentCard = 0;
	}

	const stack = docStore<Stack>(firestore, `stacks/${data.id}`);
	const cards = collectionStore<Cards>(firestore, `stacks/${data.id}/cards`);

	let shuffledCards = _.shuffle($cards);
	$: {
		shuffledCards = _.shuffle($cards);
	}
</script>

<svelte:head>
	{#if $stack}
		<title>{$stack.name} - Flasha</title>
	{:else}
		<title>Loading... - Flasha</title>
	{/if}
</svelte:head>

{#if $stack && shuffledCards}
	<div class="pb-4 flex items-center">
		<h1 class="text-3xl font-medium flex-grow p-1">{$stack.name}</h1>
		<div class="flex items-center">
			<Button href="edit"><Pencil class="text-sm" /></Button>
		</div>
	</div>
	<div class="relative flex-grow min-h-96">
		{#if currentCard < $cards.length}
			{#key currentCard}
				<Flashcard {...shuffledCards[currentCard]} {showBack} />
				<div
					class="absolute top-0 left-0 py-2 px-3 text-gray-500"
					in:fade={{ duration: 300 }}
					out:fade={{ duration: 300 }}
				>
					{currentCard + 1}/{$cards.length}
				</div>
			{/key}
		{:else}
			<div
				in:scale={{ duration: 300, start: 0.8, delay: 100 }}
				class="absolute top-0 left-0 w-full min-h-96 h-full flex items-center justify-center rounded-md bg-gray-50 drop-shadow"
			>
				<div class="text-xl text-center">Stack Complete</div>
			</div>
		{/if}
	</div>

	<div class="h-20 flex items-center">
		<div class="">
			{#if currentCard < $cards.length}
				<Button style="secondary"><ChevronLeft class="-ml-2" /> Back</Button>
			{/if}
		</div>
		<div class="flex-grow"></div>
		<div class="">
			{#if showBack}
				<Button on:click={nextCard}>Next <ChevronRight class="-mr-2" /></Button>
			{:else if currentCard < $cards.length}
				<Button on:click={flip}><Eye class="mr-1" /> Reveal</Button>
			{:else}
				<Button on:click={reset}>Study Again</Button>
			{/if}
		</div>
	</div>
{/if}
