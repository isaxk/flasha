<script lang="ts">
	import { cardColors } from "$lib/cardColors";
	import { flyAndScale } from "$lib/transition";
	import { DropdownMenu } from "bits-ui";
	import _ from "lodash";
	import { createEventDispatcher } from "svelte";
	import { quintOut } from "svelte/easing";
	import { fade, slide } from "svelte/transition";
	import Trash from "virtual:icons/lucide/trash";
	import Check from "virtual:icons/lucide/check";

	export let front: string;
	export let back: string;
	export let color: string;
	export let i: number;

	const dispatch = createEventDispatcher();

	const handleChange = _.debounce(()=>{ 
		dispatch("change", {
			front,
			back,
			color,
		});
		console.log("SDD")
	}, 500);

	function handleDelete() {
		dispatch("delete");
	}
</script>

<div class="flex items-center w-full pl-2" transition:slide={{easing:quintOut, duration: 150}}>
	<div class="w-10">{i + 1}.</div>
	<div
		class="bg-white dark:bg-neutral-800 rounded-md drop-shadow flex-grow flex gap-4 items-center py-4 px-6 lg:gap-10"
	>
	<DropdownMenu.Root closeOnItemClick={false}>
		<DropdownMenu.Trigger>
			<div
				class="rounded-sm w-9 h-9"
				style:background-color={color}
			></div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			class="bg-white dark:bg-neutral-900 border-2 border-zinc-50 dark:border-zinc-800 text-right w-max rounded-sm flex flex-col p-1 gap-4 drop-shadow-xl"
			side="bottom"
			align="start"
			sideOffset={5}
			transition={flyAndScale}
		>
			<DropdownMenu.RadioGroup
				class="grid grid-cols-4 gap-1"
				bind:value={color}
			>
				{#each cardColors as color, i}
					<DropdownMenu.RadioItem value={color} on:click={handleChange}
						><div
							class="rounded-sm w-8 h-8 relative"
							style:background-color={color}
						>
							<DropdownMenu.RadioIndicator
								class="absolute w-full h-full text-zinc-800"
							>
								<div transition:fade={{ duration: 75 }} class="bg-neutral-800/40 text-white w-full h-full flex items-center justify-center">
									<Check />
								</div>
							</DropdownMenu.RadioIndicator>
						</div>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<div class="flex-grow grid sm:grid-cols-2 gap-0">
		<div class="font-medium">
			<input
				type="text"
				class="w-full p-1 font-medium bg-transparent"
				bind:value={front}
				on:change={handleChange}
			/>
		</div>
		<div class="">
			<input
				type="text"
				class="w-full p-1 bg-transparent"
				bind:value={back}
				on:change={handleChange}
			/>
		</div>
	</div>
		<button on:click={handleDelete}><Trash /></button>
	</div>
</div>
