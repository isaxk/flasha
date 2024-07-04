<script lang="ts">
	import "../app.css";

	import { goto } from "$app/navigation";
	import { auth, firestore, provider } from "$lib/firebase";
	import { signInWithPopup } from "firebase/auth";
	import { fade } from "svelte/transition";
	import { FirebaseApp, SignedIn, SignedOut } from "sveltefire";
	import Header from "./header.svelte";
	import Landing from "./landing.svelte";
	import { darkMode } from "$lib/darkmode";
	import { Body } from "svelte-body";

	export let data;

	function signIn() {
		signInWithPopup(auth, provider);
		goto("/");
	}

	
</script>

<Body class={$darkMode ? "dark" : "light"} />

<FirebaseApp {auth} {firestore}>
	<div class="max-w-screen-lg min-h-screen m-auto px-4 flex flex-col">
		<SignedOut let:auth>
			<Landing {signIn} />
		</SignedOut>

		<SignedIn let:user let:signOut>
			<div class="flex-grow flex flex-col" in:fade={{ duration: 150 }}>
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
		@apply bg-gray-50 dark:bg-[#101010] text-neutral-800 dark:text-gray-200;
	}
	:global(html) {
		@apply scroll-smooth;
	}
</style>
