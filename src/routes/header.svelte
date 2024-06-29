<script lang="ts">
	import { flyAndScale } from "$lib/transition";
	import { DropdownMenu } from "bits-ui";
	import type { User } from "firebase/auth";
	import LogOut from "virtual:icons/lucide/log-out";
	import Bug from "virtual:icons/lucide/bug";
	import Github from "virtual:icons/lucide/github";

	export let signOut: Function;
	export let user: User;
</script>

<div class="h-20 flex items-center gap-2">
	<a href="/" class="text-xl font-normal text-neutral-700">Flasha</a>
	<div class="flex-grow"></div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<img
				src={user.photoURL}
				class="w-11 h-11 rounded-full border-2 drop-shadow-sm"
				alt="Account Menu"
			/>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			class="bg-white rounded-sm drop-shadow min-w-52 text-right py-3 px-5 flex flex-col gap-2"
			align="end"
			sideOffset={4}
			transition={flyAndScale}
		>
			<DropdownMenu.Item class="pb-2 mb-2 border-b-2 border-gray-100">
				<div class="text-lg font-medium">{user.displayName}</div>
				<div class="text-sm font-light">{user.email}</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="https://github.com/isaxk/flasha/issues" class="text-md flex gap-1 w-full items-center justify-end"><Bug /> Report a bug</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="mb-2">
				<a href="https://github.com/isaxk/flasha/" class="text-md flex gap-1 w-full items-center justify-end"><Github /> View Source</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<button on:click={() => signOut()} class="text-md flex gap-1 w-full items-center justify-end"><LogOut /> Sign Out</button>
			</DropdownMenu.Item>
			
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
