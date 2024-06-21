<script lang="ts">
	import { flyAndScale } from "$lib/transition";
	import { Tooltip } from "bits-ui";
	export let tooltip: string;
    export let href: string;
</script>

<a {href} class="p-1 hover:bg-neutral-800 hover:text-white rounded-full transition-colors flex items-center">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<slot />
		</Tooltip.Trigger>
		<Tooltip.Content side="bottom" class="bg-neutral-900 py-2 px-4 rounded-sm border-2 border-neutral-800" sideOffset={8} transition={flyAndScale}>
			{tooltip}
			<Tooltip.Arrow class="border-t-2 border-l-2 mb-0.5 border-neutral-800"/>
		</Tooltip.Content>
	</Tooltip.Root>
</a>
