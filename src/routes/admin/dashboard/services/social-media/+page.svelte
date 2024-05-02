<script lang="ts">
	import supabase from '$lib/supabase/config';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Info from 'lucide-svelte/icons/info';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let url: string;
	let postId: string;
	let searchQuery: string;
	type Post = {
		id: number;
		platform: 'Instagram' | 'Twitter' | 'LinkedIn';
		url: string;
	};
	$: console.log(postId);
	onMount(() => {
		getPosts();
	});

	let posts: Post[] = [];

	const platformList = [
		{
			value: 'instagram',
			label: 'Instagram'
		},
		{
			value: 'twitter',
			label: 'Twitter'
		},
		{
			value: 'LinkedIn',
			label: 'LinkedIn'
		}
	];

	let open = false;
	let value = '';

	$: selectedPlatform = platformList.find((f) => f.value === value)?.label ?? 'Select platform...';

	$: console.log(selectedPlatform);
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function checkInstagramUrl() {
		// Regular expression to match the Instagram post ID or reel ID
		const regex = /\/(p|reel)\/([^/?]+)/;
		// Extract the ID using the regex
		const match = url.match(regex);
		// Check if there's a match and return the formatted string or null
		if (match) {
			postId = match[1] + '/' + match[2];
			console.log(postId);
		} else {
			return null;
		}
	}

	function checkLinkedInUrl() {
		const pattern = /\/posts\/([^/?]+)/;
		const match = url.match(pattern);
		if (match) {
			postId = match[1];
		} else {
			return null;
		}
	}

	function checkTwitterUrl() {
		const pattern = /^(.*?)(?=\?|$)/;
		const match = url.match(pattern);
		if (match) {
			postId = match[1];
		} else {
			return null;
		}
	}

	async function getPosts() {
		console.log('Getting Posts');
		try {
			let { data, error } = await supabase.from('posts').select('id, platform, url');
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				posts = data;
			}
		} catch (error) {
			alert(error.message);
			// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
			// return []; // Return an empty array if fetching fails
		}
	}

	async function deletePost(id: number) {
		console.log(`Deleting testimonial with id: ${id}`);
		const { error } = await supabase.from('posts').delete().eq('id', id);
		if (error) {
			alert(error.message);
		}
		alert('Post deleted successfully');
		posts = posts.filter((t) => t.id !== id);
	}

	async function updatePost() {
		const { error } = await supabase
			.from('posts')
			.update({ url: postId })
			.eq('platform', selectedPlatform);
		if (error) {
			alert(error.message);
		}
	}

	function hasPlatform(posts: Post[], platform: string) {
		return posts.find((post) => post.platform === platform) !== undefined;
	}

	async function addPost() {
		if (!url || !url.trim()) {
			alert('Please fill the content first');
			return;
		}
		if (selectedPlatform === 'Instagram') {
			checkInstagramUrl();
		} else if (selectedPlatform === 'LinkedIn') {
			checkLinkedInUrl();
		} else if (selectedPlatform === 'Twitter') {
			checkTwitterUrl();
		} else {
			return;
		}
		if (!(posts.length > 0)) {
			await getPosts();
		}
		if (hasPlatform(posts, selectedPlatform)) {
			updatePost();
			return;
		}

		const { error } = await supabase
			.from('posts')
			.insert([{ platform: selectedPlatform, url: postId }]);
		if (error) {
			alert(error.message);
			return;
		}
		alert('Post added successfully');
	}
</script>

<h2 class="flex items-center justify-start gap-2 text-3xl">
		Social Media Posts	
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
		<Tooltip.Content side="right">These are the post displayed on the home page</Tooltip.Content>
	</Tooltip.Root>
</h2>
<hr class="m-2 border-2 border-muted-foreground" />
<div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-4">
	<Label for="name">Select platform</Label>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-[200px] justify-between border-none bg-slate-900 hover:bg-slate-700 hover:text-white"
			>
				{selectedPlatform}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[200px] border-none p-0">
			<Command.Root class="border-2 border-slate-400 bg-slate-700 text-white">
				<Command.Input placeholder="Search platform..." />
				<Command.Empty>No Platform Found</Command.Empty>
				<Command.Group>
					{#each platformList as platform}
						<Command.Item
							value={platform.value}
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
							class="text-white aria-selected:bg-slate-900 aria-selected:text-white"
						>
							<Check class={cn('mr-2 h-4 w-4', value !== platform.value && 'text-transparent')} />
							{platform.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Label for="quote">Link to the post</Label>
	<Input
		name="url"
		placeholder="Post link e.g. https://www.instagram.com/p/C4sejylIKZ9/"
		bind:value={url}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>
	<Button class="col-span-2 mt-2" on:click={addPost}>Update Post</Button>
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
					<Button on:click={getPosts}>
						<RefreshCcw class="h-6 w-6 cursor-pointer" />
					</Button>
				</span>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Refresh the database</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if posts.length > 0}
		<div class="grid grid-cols-7 gap-2 overflow-x-auto rounded-lg bg-slate-800 p-4">
			<p class="col-span-1">id</p>
			<p class="col-span-2">url</p>
			<p class="col-span-3">platform</p>
			<p class="col-span-1"></p>
			{#each posts as post (post.id)}
				{#if searchQuery === undefined || post.url
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) || post.platform
						.toLowerCase()
						.includes(searchQuery.toLowerCase())}
					<p class="col-span-1">{post.id}</p>
					<p class="col-span-3">{post.url}</p>
					<p class="col-span-2">{post.platform}</p>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<span
								class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground"
								use:builder.action
								{...builder}
							>
								<Button
									on:click={() => {
										deletePost(post.id);
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
