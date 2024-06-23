<script lang="ts">
	import type { User } from "firebase/auth";
	import { DropdownMenu } from "bits-ui";
	import { fly, scale } from "svelte/transition";
	import { flyAndScale } from "$lib/transition";

    import LogOutLine from 'virtual:icons/majesticons/logout-line';

	export let signOut: Function;
	export let user: User;
</script>

<div class="sticky">
	<div class="max-w-screen-lg m-auto h-full p-5 flex items-center">
		<div class="flex-grow">
			<a href="/" class="text-2xl font-bold">Flasha</a>
		</div>
		<div class="flex items-center gap-2">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					><img
						src={user.photoURL}
						class="w-10 h-10 rounded-full"
						alt="ProfilePic"
					/></DropdownMenu.Trigger
				>

				<DropdownMenu.Content
					class="bg-neutral-900 border-2 text-right border-neutral-800 p-2 rounded-sm flex flex-col px-5 gap-4 py-3 drop-shadow-md"
					side="bottom"
					align="end"
					sideOffset={8}
					alignOffset={0}
					transition={flyAndScale}
				>
					<DropdownMenu.Item class="pb-2">
						<div class="text-lg font-medium">
							{user.displayName}
						</div>
						<div class="text-sm font-light">{user.email}</div>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="flex justify-end">
						<button on:click={() => signOut()} class="flex gap-1 items-center"> <LogOutLine class="flex-grow" /> Sign Out</button>
					</DropdownMenu.Item>
					<DropdownMenu.Arrow
						size={10}
						class="border-t-2 border-l-2 rounded-tl-sm mb-0.5 border-neutral-800"
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</div>
