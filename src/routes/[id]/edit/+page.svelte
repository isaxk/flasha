<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import CardListItem from "$lib/components/CardListItem.svelte";
	import CirclePlay from "virtual:icons/lucide/circle-play";
	import Plus from "virtual:icons/lucide/plus";
	import { collectionStore, Doc, docStore } from "sveltefire";
	import type { Cards, Stack } from "$lib/types.js";
	import {
		createCard,
		deleteCard,
		firestore,
		updateCard,
		updateStack,
	} from "$lib/firebase";
	import {
		collection,
		limit,
		query,
		orderBy,
		Query,
		type DocumentData,
	} from "firebase/firestore";
	import Titleinput from "./titleinput.svelte";

	export let data;

	const cardsRef = collection(firestore, `/stacks/${data.id}/cards/`);
	const cardsQ = query(cardsRef, orderBy("dateAdded"));

	const stack = docStore<Stack>(firestore, `stacks/${data.id}`);
	const cards = collectionStore<Cards | DocumentData>(firestore, cardsQ);
</script>

<svelte:head>
	{#if $stack}
		<title>{$stack.name} - Flasha</title>
	{:else}
		<title>Loading... - Flasha</title>
	{/if}
</svelte:head>

{#if $stack && $cards}
	<div class="pb-4 flex items-center gap-2">
		<h1 class="text-3xl font-medium flex-grow">
			<Titleinput
				value={$stack.name}
				on:change={(e) => updateStack(data.id, { name: e.detail })}
			/>
		</h1>
		<div class="">
			<Button href="study"><CirclePlay /></Button>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		{#each $cards as card, i (card.id)}
			<CardListItem
				color={card.color}
				front={card.front}
				back={card.back}
				{i}
				on:change={(e) => {
					updateCard(data.id, card.id, {
						...e.detail,
					});
				}}
				on:delete={(e) => {
					deleteCard(data.id, card.id);
				}}
			/>
		{/each}
		<button
			on:click={() => createCard(data.id)}
			class="py-4 drop-shadow bg-neutral-200 ml-12 rounded-md mt-4 flex items-center justify-center"
			><Plus class="text-gray-400" /></button
		>
	</div>
{/if}
