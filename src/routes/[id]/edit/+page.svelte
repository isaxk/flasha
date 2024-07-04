<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import CardListItem from "$lib/components/CardListItem.svelte";
	import CirclePlay from "virtual:icons/lucide/circle-play";
	import EllipsisVertical from "virtual:icons/lucide/ellipsis-vertical";
	import Plus from "virtual:icons/lucide/plus";
	import Trash from "virtual:icons/lucide/trash";
	import { collectionStore, Doc, docStore } from "sveltefire";
	import type { Cards, Stack } from "$lib/types.js";
	import {
		createCard,
		deleteCard,
		deleteStack,
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
	import { AlertDialog, DropdownMenu } from "bits-ui";
	import { flyAndScale } from "$lib/transition";
	import { fade } from "svelte/transition";

	export let data;

	let delDialog: boolean = false;

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
	<div class="pb-4 flex items-center gap-2 relative">
		<Titleinput
			value={$stack.name}
			on:change={(e) => updateStack(data.id, { name: e.detail })}
		/>
		<div class="flex gap-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button style="secondary"><EllipsisVertical /></Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="bg-white dark:bg-neutral-900 rounded-sm drop-shadow-xl text-right py-3 px-5"
					align="end"
					sideOffset={4}
					transition={flyAndScale}
				>
					<DropdownMenu.Item
						class="flex gap-1 items-center cursor-pointer"
						on:click={() => (delDialog = true)}
					>
						<Trash /> Delete Stack
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
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
			class="py-4 drop-shadow bg-neutral-200 dark:bg-neutral-800 ml-12 rounded-md mt-4 flex items-center justify-center"
			><Plus class="text-gray-400" /></button
		>
	</div>
{/if}

<AlertDialog.Root bind:open={delDialog} closeOnEscape closeOnOutsideClick>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-40 bg-black/80"
		/>
		<AlertDialog.Content
			transition={flyAndScale}
			class="fixed left-[50%] top-[50%] z-50 bg-zinc-50 rounded-md grid w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-card-lg border bg-background p-7 shadow-popover outline-none sm:max-w-lg md:w-full"
		>
			<div class="flex flex-col gap-4 pb-6">
				<AlertDialog.Title class="text-xl font-semibold tracking-tight"
					>Are you sure you want to <span class="text-red-500 font-bold"
						>delete</span
					> this stack?</AlertDialog.Title
				>
				<AlertDialog.Description class="text-sm text-foreground-alt">
					This action cannot be undone, upon confirmation you will no longer
					have access to this stack.
				</AlertDialog.Description>
			</div>
			<div class="flex w-full items-center justify-evenly gap-10">
				<AlertDialog.Cancel class="">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					on:click={() => {
						deleteStack(data.id);
					}}
					><Button style="danger">Delete</Button>
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
