<script lang="ts">
	import { fade } from "svelte/transition";
	import lodash from "lodash";
	import { Doc } from "sveltefire";
	import StackPageHeader from "../StackPageHeader.svelte";
	import CardListItems from "./CardListItems.svelte";
	import { newCard, updateCard } from "$lib/firebase";

	export let data;

	let saving = false;

	const handleUpdate = lodash.debounce(async (stack: any, i: number, detail: any) => {
		saving = true;
		await updateCard(data.id, stack, i, detail);
		window.setTimeout(()=>{
			saving = false;
		}, 500);
	}, 1000);
</script>

<Doc ref={"stacks/" + data.id} let:data={stack}>
	<div in:fade={{}} class="flex-grow flex flex-col gap-5 pb-5">
		<StackPageHeader name={stack.name} type="edit" {saving}/>
		<div class="flex flex-col gap-4">
			{#each stack.cards as card, i (i)}
				<CardListItems
					{...card}
					{i}
					on:update={(e) => {
						handleUpdate(stack, i, e.detail);
					}}
				/>
			{/each}
		</div>
		<div class="">
			<button class="py-2 px-4" on:click={() => newCard(data.id, stack)}
				>Add Card</button
			>
		</div>
	</div>
</Doc>
