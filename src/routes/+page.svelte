<script lang="ts">
	import StackListItem from "$lib/components/StackListItem.svelte";
	import { createStack, firestore } from "$lib/firebase";
	import { collection, Query, query, where } from "firebase/firestore";
	import Plus from "virtual:icons/lucide/plus";

	import { Collection, userStore } from "sveltefire";
	import { auth } from "$lib/firebase"; // your firebase auth instance
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";

	const user = userStore(auth);
	let q: Query<any> | null = null;
	$: {
		if ($user) {
			q = query(collection(firestore, `stacks`), where("uid", "==", $user.uid));
		}
	}

	async function handleNew() {
		await createStack();
	}
</script>

<svelte:head>
	<title>Flasha</title>
</svelte:head>

{#if $user && q}
	<Collection ref={q} let:data={stacks}>
		{#key stacks}
			<div
				class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
				in:fade={{ duration: 150 }}
			>
				{#each stacks as stack, i (stack.id)}
					<StackListItem name={stack.name} id={stack.id} />
				{/each}
				<button
					on:click={handleNew}
					class="h-32 mt-1 hover:mt-0 transition-all rounded-md border-2 border-gray-200 dark:border-neutral-700 bg-zinc-100 dark:bg-neutral-800 flex items-center justify-center"
					><Plus /></button
				>
			</div>
		{/key}

		<div slot="loading">Loading...</div>
	</Collection>
{/if}
