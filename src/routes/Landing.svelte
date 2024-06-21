<script lang="ts">
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithRedirect,
		type Auth,
	} from "firebase/auth";

	export let auth: Auth;

	const provider = new GoogleAuthProvider();
    function signIn() {
        signInWithPopup(auth, provider);
    }
	
</script>

<div class="flex items-center h-screen w-full justify-center">
	<div class="text-center">
		<div class="text-5xl font-bold">Flasha</div>
		<div class="text-xl mt-1">Stunningly simple flashcards.</div>
		<button on:click={signIn} class="py-3 px-5 mt-5 rounded-sm border-2 border-neutral-700">Sign In with Google</button>
	</div>
</div>
