<script lang="ts">
	import _ from "lodash";
	import { createEventDispatcher } from "svelte";

	export let value: string;

	const dispatch = createEventDispatcher();

	const handleChange = _.debounce(()=> {
		dispatch("change", value);
	}, 500);
</script>

<input
	type="text"
	on:change={handleChange}
	class="w-full p-1 bg-transparent focus:bg-white"
	bind:value
/>
