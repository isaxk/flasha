<script lang="ts">
	import StackListItem from "$lib/components/StackListItem.svelte";
	import Plus from "virtual:icons/majesticons/plus";
	import { firestore } from "$lib/firebase";

	import { query, collection, where } from "firebase/firestore";

	import { Collection, userStore } from "sveltefire";
	import { auth } from "$lib/firebase"; // your firebase auth instance
	import Header from "./Header.svelte";
	import { fade } from "svelte/transition";

	const user = userStore(auth);

	$: q = query(collection(firestore, `stacks`), where("uid", "==", $user.uid));
</script>

<div class="">
	<div class="text-xl">Your Stacks:</div>
	<div class="mt-5 py-2">
		<Collection ref={q} let:data={stacks}>
			{#key stacks}
				<ul
					class="grid grid-cols-2 md:grid-cols-3 gap-4"
					in:fade={{ duration: 300 }}
				>
					{#each stacks as stack (stack.id)}
						<StackListItem name={stack.name} id={stack.id} />
					{/each}
					<li
						class="h-40 flex flex-col p-4 border-2 border-neutral-700 rounded-sm"
					>
						<div class="flex-grow flex items-center justify-center text-3xl text-neutral-600"><Plus /></div>
					</li>
				</ul>
			{/key}
			<div slot="loading" class="text-xl">loading...</div>
		</Collection>
	</div>
</div>
