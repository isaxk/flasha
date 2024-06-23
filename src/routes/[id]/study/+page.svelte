<script lang="ts">
	import { flyAndScale } from "$lib/transition.js";
	import { fade, fly, scale } from "svelte/transition";
	import { Doc } from "sveltefire";
	import ChevronLeftLine from "virtual:icons/majesticons/chevron-left-line";
	import ChevronRightLine from "virtual:icons/majesticons/chevron-right-line";
	import Refresh from "virtual:icons/majesticons/refresh";
	import PencilAltLine from "virtual:icons/majesticons/pencil-alt-line";
	import ViewListLine from "virtual:icons/majesticons/view-list-line";
	import Flashcard from "./Flashcard.svelte";
	import { Confetti } from "svelte-confetti";
	import { Drawer } from "vaul-svelte";
	import StackPageHeader from "../StackPageHeader.svelte";

	export let data;

	let showBack = false;

	let mode: "edit" | "study" = "study";

	const flashcards = [
		{
			front: "Front 1",
			back: "Back 1",
		},
		{
			front: "Front 2",
			back: "Back 2",
		},
	];

	let currentFlashcard = 0;
	let cancelTransition = 0;
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<Doc ref={"stacks/" + data.id} let:data>
	<div in:fade={{}} class="flex-grow flex flex-col gap-5 pb-5">
		<StackPageHeader name={data.name} type="study" />
		<div class="relative flex-grow">
			{#if currentFlashcard < data.cards.length}
				{#key cancelTransition}
					{#key currentFlashcard}
						<Flashcard
							{...data.cards[currentFlashcard]}
							{showBack}
							i={currentFlashcard}
							total={data.cards.length}
						/>
					{/key}
				{/key}
			{:else}
				<div
					class="text-2xl font-medium absolute top-0 left-0 w-full h-full flex justify-center items-center"
					in:scale={{ start: 0.7, opacity: 0, duration: 500, delay: 100 }}
				>
					<div class="flex items-center flex-col">
						<Confetti fallDistance="50px" x={[-1, 1]} y={[0.1, 1]} />
						<div class="">Stack Complete</div>
					</div>
				</div>
			{/if}
		</div>
		<div class="py-0 flex justify-center items-center">
			{#if currentFlashcard < data.cards.length && currentFlashcard > 0}
				<button
					on:click={() => {
						if (currentFlashcard > 0) {
							currentFlashcard += -1;
							cancelTransition++;
						}
					}}
					class="text-xl px-5 py-3 flex items-center gap-1 text-neutral-400"
					><ChevronLeftLine /> Back</button
				>
			{/if}
			<div class="flex-grow flex justify-center items-center"></div>
			{#if showBack}
				<button
					class="text-xl px-5 py-3 flex items-center gap-1"
					on:click={() => {
						currentFlashcard++;
						showBack = false;
					}}
				>
					Next <ChevronRightLine /></button
				>
			{:else if currentFlashcard < data.cards.length}
				<button
					class="text-xl px-5 py-3 flex items-center gap-1"
					on:click={() => {
						showBack = true;
					}}><Refresh /> Reveal</button
				>
			{:else}
				<button
					class="text-xl px-5 py-3 flex items-center gap-1"
					on:click={() => {
						currentFlashcard = 0;
					}}><Refresh /> Study Again</button
				>
			{/if}
		</div>
	</div>

	<p slot="loading" class="w-full h-96 mt-10 flex items-center justify-center">
		Loading...
	</p>
</Doc>
