<script lang="ts">
	import { cardColors } from "$lib/data/cardcolors";
	import lodash from "lodash";
	import { flyAndScale } from "$lib/transition";
	import { DropdownMenu, RadioGroup } from "bits-ui";
	import { createEventDispatcher } from "svelte";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import CheckLine from "virtual:icons/majesticons/check-line";

	export let front: string;
	export let back: string;
	export let color: number;
	export let i: number;

	const dispatch = createEventDispatcher();

	const data = writable({ front, back, color: color.toString() });

	data.subscribe((v: any) => {
		dispatch("update", {
			front: v.front,
			back: v.back,
			color: parseInt(v.color),
		});
	});
</script>

<div
	class="flex items-center px-3 border-2 border-neutral-600 gap-3 rounded-sm"
>
	<div class="w-3">{i + 1}.</div>
	<DropdownMenu.Root closeOnItemClick={false}>
		<DropdownMenu.Trigger>
			<div
				class="rounded-sm w-9 h-9"
				style:background-color={cardColors[parseInt($data.color)]}
			></div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			class="bg-neutral-800 border-2 text-right border-neutral-700 w-max rounded-sm flex flex-col p-1 gap-4 drop-shadow-md"
			side="bottom"
			align="start"
			sideOffset={5}
			transition={flyAndScale}
		>
			<DropdownMenu.RadioGroup
				class="grid grid-cols-4 gap-1"
				bind:value={$data.color}
			>
				{#each cardColors as color, i}
					<DropdownMenu.RadioItem value={i.toString()}
						><div
							class="rounded-sm w-8 h-8 relative"
							style:background-color={cardColors[i]}
						>
							<DropdownMenu.RadioIndicator
								class="absolute w-full h-full text-zinc-800"
							>
								<div transition:fade={{ duration: 50 }} class="bg-neutral-800/20 w-full h-full flex items-center justify-center">
									<CheckLine />
								</div>
							</DropdownMenu.RadioIndicator>
						</div>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<div class="flex flex-col w-full py-1 text-neutral-300">
		<input
			class="text-lg bg-transparent p-0.5 pb-0 w-full outline-none focus:text-neutral-200 transition-colors"
			bind:value={$data.front}
		/>
		<input
			class="text-md bg-transparent p-0.5 pb-0 -mt-1 w-full outline-none focus:text-neutral-200 transition-colors"
			bind:value={$data.back}
		/>
	</div>
</div>
