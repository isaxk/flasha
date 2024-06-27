<script>
	import StackListItem from "$lib/components/StackListItem.svelte";
	import { firestore } from "$lib/firebase";
	import { collection, query, where } from "firebase/firestore";

	import { Collection, userStore } from "sveltefire";
	import { auth } from "$lib/firebase"; // your firebase auth instance
	import { fade } from "svelte/transition";

	const user = userStore(auth);
	$: q = query(collection(firestore, `stacks`), where("uid", "==", $user.uid));
</script>

<svelte:head>
	<title>Flasha</title>
</svelte:head>

<Collection ref={q} let:data={stacks}>
	{#key stacks}
		<div
			class="grid grid-cols-2 md:grid-cols-3 gap-3"
			in:fade={{ duration: 150 }}
		>
			{#each stacks as stack, i (stack.id)}
				<StackListItem name={stack.name} id={stack.id} />
			{/each}
		</div>
	{/key}
	<div slot="loading">Loading...</div>
</Collection>
