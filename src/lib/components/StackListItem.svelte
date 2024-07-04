<script lang="ts">
	import { goto } from "$app/navigation";

	export let name: string;
    export let id: string;
</script>

<div class="relative w-full h-40 whole z-0">
	<div class="absolute pointer-events-none -z-10 -top-1 left-0 h-32 w-full flex justify-center">
		<div class="h-32 w-[90%] bg-neutral-200 dark:bg-neutral-900 rounded-[4px] transition-all drop-shadow-xl"></div>
	</div>
	<a
		tabindex="0"
		href="#"
		role="button"
		on:dblclick={()=>goto(`/${id}/study`)}
		class="absolute z-0 card flex flex-col hover:cursor-pointer top-1 left-0 bg-white dark:bg-neutral-800 h-32 w-full rounded-[8px] drop-shadow transition-all"
	>
		<div class="flex-grow flex items-center justify-center">
			<div class="font-medium px-3 text-center">
				{name}
			</div>
		</div>
		
	</a>
    <div
			class="absolute -z-10 top-20 pt-0.5 flex justify-center w-full pb-0 options h-10 transition-all hover:-bottom-8"
		>
			<div class="w-[95%] bg-blue-400 text-white flex gap-3 justify-evenly items-center rounded-b-md">
				<a href="/{id}/study">Study</a>
				<a href="/{id}/edit">Edit</a>
			</div>
		</div>
</div>

<style lang="postcss">
	.whole:hover .options {
		@apply top-28 mt-2 drop-shadow-md;
	}
    .whole:hover .card {
        @apply -top-1 drop-shadow-xl;
    }
    /* .card:hover + .options {
        @apply -bottom-8 drop-shadow-md;
    } */
</style>
