<script lang="ts">
	import PlayCircleLine from "virtual:icons/majesticons/play-circle-line";
	import PencilAltLine from "virtual:icons/majesticons/pencil-alt-line";
	import StackListItemAction from "./StackListItemAction.svelte";

    export let name: string;
    export let id: string;
</script>

<li class="h-40 flex flex-col p-4 border-2 border-neutral-700 rounded-sm">
	<div class="flex-grow"></div>
	<div class="flex gap-2 items-center">
		<div class="font-medium flex-grow">{name}</div>
		<div class="flex items-center gap-2">
			<StackListItemAction href="/{id}/edit" tooltip="Edit cards"><PencilAltLine /></StackListItemAction>
			<StackListItemAction href="/{id}/study" tooltip="Study"
				><PlayCircleLine /></StackListItemAction
			>
		</div>
	</div>
</li>
