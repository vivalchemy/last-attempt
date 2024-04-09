<script lang="ts">
	import supabase from '$lib/supabase/config';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Info from 'lucide-svelte/icons/info';
	import { onMount } from 'svelte';

	let name: string;
	let quote: string;
	let searchQuery: string;
	type Testimonial = {
		id: number;
		name: string;
		quote: string;
	};
	onMount(() => {
		getTestimonials();
	});

	let testimonials: Testimonial[] = [
		{
			id: 1,
			name: 'John Doe',
			quote: 'Great service! Highly recommend.'
		},
		{
			id: 2,
			name: 'Jane Smith',
			quote: 'The product exceeded my expectations.'
		},
		{
			id: 3,
			name: 'Alice Johnson',
			quote: 'Outstanding support team. Very responsive.'
		}
	];
	async function addTestimonial() {
		if (!name || !quote || !name.trim() || !quote.trim()) {
			alert('Please fill the content first');
			return;
		}
		const { error } = await supabase.from('testimonials').insert([{ name, quote }]);
		if (error) {
			alert(error.message);
			return;
		}
		name = '';
		quote = '';
		alert('Testimonial added successfully');
	}

	async function getTestimonials() {
		console.log('Getting testimonials');
		try {
			let { data, error } = await supabase.from('testimonials').select('id, name, quote');
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				testimonials = data;
			}
		} catch (error) {
			alert(error.message);
			// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
			// return []; // Return an empty array if fetching fails
		}
	}

	async function deleteTestimonial(id: number) {
		console.log(`Deleting testimonial with id: ${id}`);
		const { error } = await supabase.from('testimonials').delete().eq('id', id);
		if (error) {
			alert(error.message);
		}
		alert('Testimonial deleted successfully');
		testimonials = testimonials.filter((t) => t.id !== id);
	}
</script>

<h2 class="flex items-center justify-start gap-2 text-3xl">
	Testimonials
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<span
				class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<Info class="h-5 w-5" />
			</span>
		</Tooltip.Trigger>
		<Tooltip.Content side="right"
			>These are the testimonials displayed on the home page</Tooltip.Content
		>
	</Tooltip.Root>
</h2>
<hr class="m-2 border-2 border-muted-foreground" />
<div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-4">
	<Label for="name">Author name</Label>
	<Input
		name="name"
		placeholder="Author"
		bind:value={name}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>

	<Label for="quote">Testimonial</Label>
	<Textarea
		name="quote"
		placeholder="Review by the author"
		bind:value={quote}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>
	<Button class="col-span-2 mt-2" on:click={addTestimonial}>Add Testimonial</Button>
</div>
<div class="mt-4 flex flex-col gap-2">
	<div class="flex justify-end gap-2">
		<Input
			name="searchInput"
			placeholder="Search a testimonial"
			bind:value={searchQuery}
			class="w-1/2 border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
		/>

		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<span
					class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground"
					use:builder.action
					{...builder}
				>
					<Button on:click={getTestimonials}>
						<RefreshCcw class="h-6 w-6 cursor-pointer" />
					</Button>
				</span>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Refresh the database</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if testimonials.length > 0}
		<div class="grid grid-cols-7 gap-2 overflow-x-auto rounded-lg bg-slate-800 p-4">
			<p class="col-span-1">id</p>
			<p class="col-span-2">name</p>
			<p class="col-span-3">quote</p>
			<p class="col-span-1"></p>
			{#each testimonials as testimonial (testimonial.id)}
				{#if searchQuery === undefined || testimonial.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) || testimonial.quote
						.toLowerCase()
						.includes(searchQuery.toLowerCase())}
					<p class="col-span-1">{testimonial.id}</p>
					<p class="col-span-2">{testimonial.name}</p>
					<p class="col-span-3">{testimonial.quote}</p>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<span
								class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground"
								use:builder.action
								{...builder}
							>
								<Button
									on:click={() => {
										deleteTestimonial(testimonial.id);
									}}
									class="col-span-1 bg-transparent"
								>
									<Trash2 class="h-4 w-4 rounded-md text-white" />
								</Button>
							</span>
						</Tooltip.Trigger>
						<Tooltip.Content side="right">Delete the entry from the database</Tooltip.Content>
					</Tooltip.Root>
				{/if}
			{/each}
		</div>
	{/if}
</div>
