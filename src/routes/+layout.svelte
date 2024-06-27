<script lang="ts">
	import "../app.css";

	import { FirebaseApp, SignedIn, SignedOut } from "sveltefire";
	import { initializeApp } from "firebase/app";
	import { getFirestore } from "firebase/firestore";
	import {
		getAuth,
		GoogleAuthProvider,
		signInWithPopup,
		signOut,
	} from "firebase/auth";
	import Landing from "./landing.svelte";
	import Header from "./header.svelte";
	import { auth, firestore, provider } from "$lib/firebase";
	import { fade } from "svelte/transition";
	import { goto } from "$app/navigation";

	export let data;

	function signIn() {
		signInWithPopup(auth, provider);
		goto("/");
	}
</script>

<FirebaseApp {auth} {firestore}>
	<div class="max-w-screen-md min-h-screen m-auto px-4 flex flex-col">
		<SignedOut let:auth>
			<Landing {signIn} />
		</SignedOut>

		<SignedIn let:user let:signOut>
			<div class="flex-grow flex flex-col" in:fade={{duration:150}}>
				<Header {signOut} {user} />
				{#key data.url}
					<div
						class="pt-10 pb-5 flex-grow flex flex-col"
						in:fade={{ duration: 150, delay: 160 }}
						out:fade={{ duration: 150 }}
					>
						<slot />
					</div>
				{/key}
			</div>
		</SignedIn>
	</div>
</FirebaseApp>

<style lang="postcss">
	:global(body) {
		@apply bg-gray-50 text-neutral-800;
	}
	:global(html) {
		@apply scroll-smooth;
	}
</style>
