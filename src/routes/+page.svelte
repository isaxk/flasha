<script lang="ts">
	import StackListItem from "$lib/components/StackListItem.svelte";
	import Plus from "virtual:icons/majesticons/plus";
	import { firestore, newStack } from "$lib/firebase";

	import { query, collection, where } from "firebase/firestore";

	import { Collection, userStore } from "sveltefire";
	import { auth } from "$lib/firebase"; // your firebase auth instance
	import Header from "./Header.svelte";
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";

	const user = userStore(auth);

	$: q = query(collection(firestore, `stacks`), where("uid", "==", $user.uid));

	async function handleNew() {
		const newStackId = await newStack($user.uid);
		goto(newStackId + "/edit");
	}
</script>

<div class="">
	<div class="text-xl">Your Stacks:</div>
	<div class="mt-5 py-2">
		<Collection ref={q} let:data={stacks}>
			{#key stacks}
				<ul
					class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
					in:fade={{ duration: 300 }}
				>
					{#each stacks as stack (stack.id)}
						<StackListItem name={stack.name} id={stack.id} />
					{/each}
					<button
						on:click={handleNew}
						class="h-40 flex flex-col p-4 border-2 rounded-sm border-neutral-800 hover:border-neutral-700
				hover:bg-neutral-800 transition-colors"
					>
						<div
							class="flex-grow w-full flex items-center justify-center text-3xl text-neutral-600"
						>
							<Plus />
						</div>
					</button>
				</ul>
			{/key}
			<div slot="loading" class="text-xl">loading...</div>
		</Collection>
	</div>
</div>
