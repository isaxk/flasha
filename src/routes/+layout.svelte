<script lang="ts">
	import "../app.css";
	import Header from "./Header.svelte";

	import { initializeApp } from "firebase/app";
	import { getAuth } from "firebase/auth";
	import { getFirestore } from "firebase/firestore";
	import { FirebaseApp, SignedIn, SignedOut } from "sveltefire";
	import Landing from "./Landing.svelte";
	import { fade, slide } from "svelte/transition";
	import {firestore, auth} from "$lib/firebase";
	
</script>

<FirebaseApp {auth} {firestore}>
	<SignedOut let:auth>
		<Landing {auth} />
	</SignedOut>

	<SignedIn let:user let:signOut>
		<div in:fade class="max-w-screen-lg m-auto">
			<Header {user} {signOut} />
			<div class="px-5 pt-10">
				<slot {firestore}/>
			</div>
		</div>
	</SignedIn>
</FirebaseApp>

<style lang="postcss">
	:global(body) {
		@apply bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-gray-200 min-h-screen;
	}
	:global(html) {
		@apply min-h-screen
	}
</style>
