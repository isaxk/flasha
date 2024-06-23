<script lang="ts">
	import { fade } from "svelte/transition";
	import lodash from "lodash";
	import { Doc } from "sveltefire";
	import StackPageHeader from "../StackPageHeader.svelte";
	import CardListItems from "./CardListItems.svelte";
	import Plus from "virtual:icons/majesticons/plus";
	import { newCard, updateCard } from "$lib/firebase";

	export let data;

	let saving = false;

	const handleUpdate = lodash.debounce(
		async (stack: any, i: number, detail: any) => {
			saving = true;
			await updateCard(data.id, stack, i, detail);
			window.setTimeout(() => {
				saving = false;
			}, 500);
		},
		1000,
	);
</script>

<Doc ref={"stacks/" + data.id} let:data={stack}>
	<div in:fade={{}} class="flex-grow flex flex-col gap-5 pb-5">
		<StackPageHeader name={stack.name} type="edit" {saving} />
		<div class="grid gap-4 pb-10">
			{#each stack.cards as card, i (i)}
				<CardListItems
					{...card}
					{i}
					on:update={(e) => {
						handleUpdate(stack, i, e.detail);
					}}
				/>
			{/each}
			<button
				on:click={() => {
					newCard(data.id, stack);
					window.setTimeout(() => {
						window.scrollTo(0, document.body.scrollHeight);
					}, 100);
				}}
				class="flex items-center justify-center text-2xl px-3 border-2 text-neutral-600 border-neutral-800 hover:border-neutral-700
				hover:bg-neutral-800 transition-colors gap-5 h-20 rounded-sm"><Plus /></button
			>
		</div>
	</div>
</Doc>
