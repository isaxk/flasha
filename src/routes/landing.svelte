<script lang="ts">
	import Button from "$lib/components/Button.svelte";

	export let signIn: Function;
</script>

<div class="flex w-full h-screen items-center justify-center">
	<div class="text-center">
		<h1 class="text-5xl font-medium">Flasha</h1>
		<h3 class="text-xl mb-5">Stunningly Simple Flashcards</h3>
		<ul class="list-inside list-disc mb-5">
			<li>Free</li>
			<li>Open Source</li>
			<li>Automatic Sync</li>
		</ul>
		<div class="flex justify-center"><Button on:click={()=>signIn()}>Sign In with Google</Button></div>
	</div>
</div>
