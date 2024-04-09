<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { X } from 'lucide-svelte';
	import { pages } from './PageList.js';
	// import NavbarSpacer from "$lib/components/block/NavbarSpacer.svelte";

	let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let starts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let value = ''; // this contains the current value of the search bar
	/**
	 * @param {{ target: { value: string; }; }} e
	 */
	function searchInput(e) {
		value = e.target.value.toLowerCase();
		if (starts !== 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
			starts = 'ABCDEFGHIJKLMNOPQRSTU';
		}
		// console.log(value);
	}

	function resetSearch() {
		starts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		value = '';
	}
</script>

<!-- <NavbarSpacer /> -->

<div class="my-4 flex flex-wrap">
	{#each alphabets as alphabet}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			class="mx-3 my-1 cursor-pointer rounded-sm px-2 py-1 hover:bg-slate-800"
			on:click={() => {
				starts = alphabet;
				// console.log(starts);
			}}>{alphabet}</span
		>
	{/each}
</div>

<!-- <form class="flex items-center space-x-2"> -->
<div class="flex justify-center gap-2">
	<Input
		type="text"
		placeholder="Search"
		on:input={searchInput}
		class="bg-slate-950 focus:border-slate-950 lg:w-1/2"
	/>
	<Button
		class={value === '' ? 'hidden' : ''}
		type="submit"
		on:click={resetSearch}
		title="resets the search"><X /></Button
	>
</div>
<!-- </form> -->

<div class="mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
	{#each pages as page}
		{#if (page.title.toLowerCase().includes(value) || page.description
				.toLowerCase()
				.includes(value)) && starts.includes(page.title[0])}
			<a href={page.link} class="m-2 block rounded-lg border p-4 bg-slate-900">
				<p class="text-lg font-bold">{page.title}</p>
				<p class="text-md">{page.description}</p>
			</a>
		{/if}
	{/each}
</div>
