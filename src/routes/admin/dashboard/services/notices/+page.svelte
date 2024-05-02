<script lang="ts">
	import supabase from '$lib/supabase/config';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Info from 'lucide-svelte/icons/info';
	import { onMount } from 'svelte';

	let title: string;
	let description: string;
	let link: string;
	let searchQuery: string;
	type Notice = {
		id: number;
		title: string;
		description: string;
		link: string;
	};
	// onMount(() => {
	// 	getNotices();
	//});
	let notices: Notice[] = [];
	async function addNotice() {
		if (!title || !title.trim()) {
			alert('Please fill the content first');
			return;
		}
		title = title.trim();
		description = description.trim();
		link = link.trim();
		const { error } = await supabase.from('notices').insert([{ title, description, link }]);
		if (error) {
			alert(error.message);
			return;
		}
		title = '';
		description = '';
		link = '';
		alert('Notice added successfully');
	}

	async function getNotices() {
		console.log('Getting notices');
		try {
			let { data, error } = await supabase.from('notices').select('id, title,description,link');
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				notices = data;
			}
		} catch (error) {
			alert(error.message);
			// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
			// return []; // Return an empty array if fetching fails
		}
	}

	async function deleteNotice(id: number) {
		console.log(`Deleting notice with id: ${id}`);
		const { error } = await supabase.from('notices').delete().eq('id', id);
		if (error) {
			alert(error.message);
		}
		alert('notice deleted successfully');
		notices = notices.filter((t) => t.id !== id);
	}
</script>

<h2 class="flex items-center justify-start gap-2 text-3xl">
	Notices
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
		<Tooltip.Content side="right">These are the Notices displayed on the home page</Tooltip.Content>
	</Tooltip.Root>
</h2>
<hr class="m-2 border-2 border-muted-foreground" />
<div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-4">
	<Label for="title">Title</Label>
	<Input
		name="title"
		placeholder="title"
		bind:value={title}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>
	<Label for="description">Description</Label>
	<Input
		name="description"
		placeholder="description"
		bind:value={description}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>
	<Label for="link">Link</Label>
	<Input
		name="link"
		placeholder="link"
		bind:value={link}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>

	<Button class="col-span-2 mt-2" on:click={addNotice}>Add Notice</Button>
</div>
<div class="mt-4 flex flex-col gap-2">
	<div class="flex justify-end gap-2">
		<Input
			name="searchInput"
			placeholder="Search a Notice"
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
					<Button on:click={getNotices}>
						<RefreshCcw class="h-6 w-6 cursor-pointer" />
					</Button>
				</span>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Refresh the database</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if notices.length > 0}
		<div class="grid grid-cols-10 gap-2 overflow-x-auto rounded-lg bg-slate-800 p-4">
			<p class="col-span-1">id</p>
			<p class="col-span-2">title</p>
			<p class="col-span-3">description</p>
			<p class="col-span-3">link</p>
			<p class="col-span-1"></p>
			{#each notices as notice (notice.id)}
				{#if searchQuery === undefined || notice.title
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) || notice.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase())}
					<p class="col-span-1">{notice.id}</p>
					<p class="col-span-2">{notice.title}</p>
					<p class="col-span-3">{notice.description}</p>
					<p class="col-span-3">{notice.link}</p>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<span
								class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground"
								use:builder.action
								{...builder}
							>
								<Button
									on:click={() => {
										deleteNotice(notice.id);
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
