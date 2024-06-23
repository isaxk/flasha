<script lang="ts">
	import ChevronLeftLine from "virtual:icons/majesticons/chevron-left-line";
	import ViewListLine from "virtual:icons/majesticons/view-list-line";
	import PlayCircleLine from "virtual:icons/majesticons/play-circle-line";

	export let name: string;
	export let type: "edit" | "study";
	export let saving: boolean = false;
</script>

<div class="flex items-center gap-1 pr-2">
	<div class="flex-grow">
		<div class="text-xl">
			<span class="font-light"
				>{#if type == "edit"}Editing{:else}Studying{/if}
			</span><span class="font-medium">{name}</span>...
		</div>
		{#if type == "edit"}
			<div class="text-sm text-neutral-400">
				{#if saving}
					Saving changes...
				{:else}
					Changes Saved
				{/if}
			</div>
		{/if}
	</div>
	{#if type == "edit"}
		<a href="study" class="text-xl">
			<PlayCircleLine />
		</a>
	{:else}
		<a href="edit" class="text-xl">
			<ViewListLine />
		</a>{/if}
</div>
