<script lang="ts">
	import StackListItem from "$lib/components/StackListItem.svelte";
	import { firestore } from "$lib/firebase";

	import { query, collection, where } from "firebase/firestore";

	import { Collection, userStore } from "sveltefire";
	import { auth } from "$lib/firebase"; // your firebase auth instance
	import { loadConfigFromFile } from "vite";
	import Header from "./Header.svelte";

	const user = userStore(auth);

	$: q = query(collection(firestore, `stacks`), where("uid", "==", $user.uid));
</script>

<div class="">
	<div class="text-xl">Your Stacks:</div>
	<div class="mt-5 py-2">
		<Collection ref={q} let:data={stacks}>
			<ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
				{#each stacks as stack (stack.id)}
					<StackListItem name={stack.name} id={stack.id}/>
				{/each}
			</ul>
            <!-- <div slot="loading">loading</div> -->
		</Collection>
	</div>
</div>
