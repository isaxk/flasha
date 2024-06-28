<script lang="ts">
	import { goto } from "$app/navigation";
	import { createEventDispatcher, SvelteComponent } from "svelte";

	export let style: "primary" | "secondary" | "danger" = "primary";
	export let href: string = "#";

	let CLASS: string = "";
	export { CLASS as class };

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch("click");
		if (href !== "#") {
			goto(href);
		}
	}
</script>

<button
	on:click={handleClick}
	class="bg-blue-400 flex justify-center items-center gap-0 py-2 px-5 rounded-full drop-shadow-md text-white {style ==
	'secondary'
		? 'bg-gray-400'
		: style == 'danger'
			? 'bg-red-500'
			: ''} {CLASS}"
>
	<slot />
</button>
