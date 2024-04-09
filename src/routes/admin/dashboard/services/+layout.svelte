<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Input } from '$lib/components/ui/input';
	import { services } from './services';

	let searchServiceInput: string;
	$: console.log(searchServiceInput);
</script>

<div class="inset-y-0 m-4 ml-0 flex h-screen w-min flex-col rounded-lg bg-slate-900 px-4 py-4">
	<Input
		placeholder="Search Service"
		class="mb-2 w-56 bg-slate-950"
		bind:value={searchServiceInput}
	/>
	<Accordion.Root>
		{#each services as service (service)}
			{#if searchServiceInput === undefined || service.title
					.toLowerCase()
					.includes(searchServiceInput)}
				<a href={service.href} draggable="false">
					<p class="my-2 flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1">
						{#if service.icon}
							<svelte:component this={service.icon} class="h-4 w-4" />
						{:else}
							<div class="h-4 w-4"></div>
						{/if}
						{service.title}
					</p>
				</a>
			{/if}
		{/each}
	</Accordion.Root>
</div>
<div class="inset-y-0 m-4 ml-0 h-screen flex-1 rounded-lg bg-slate-900 px-4 py-4 overflow-y-auto">
	<slot />
</div>
