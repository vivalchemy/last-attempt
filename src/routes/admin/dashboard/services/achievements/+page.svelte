<script lang="ts">
	import supabase from '$lib/supabase/config';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Info from 'lucide-svelte/icons/info';
	import { onMount } from 'svelte';
	import { Eye } from 'lucide-svelte';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	let storage = supabase.storage;
	let title: string;
	let link: string;
	let fileName: string;
	let fileExt: string;
	let thumbnail: string;
	let uploadFileName: string;
	let file: File;
	let searchQuery: string;
	type Achievement = {
		id: number;
		title: string;
		link?: string;
		thumbnail: string;
	};
	let achievements: Achievement[] = [];
	$: console.log(achievements);

	onMount(() => {
		getAchievements();
	})
	async function addAchievement(thumbnail: string) {
		try {
			const { data, error } = await supabase
				.from('achievements')
				.insert([{ title, link, thumbnail }]);
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				achievements = data;
			}
		} catch (error) {
			alert(error.message);
		}
	}

	async function addThumbnail() {
		if (title == null || title == '') {
			alert('Please fill the link first');
			return;
		}
		const fileInput = document.getElementById('file');
		file = fileInput.files[0]; // Get the first selected file

		if (!file) {
			alert('Please select a file');
			return;
		}
		if (!fileName) {
			fileName = file.name.split('.')[0];
		} else if (fileName.includes('.')) {
			fileName = fileName.split('.')[0];
			// Replace invalid characters with underscores
		}
		fileExt = file.name.split('.')[1];
		uploadFileName = `${fileName}.${fileExt}`;
		// alert(uploadFileName); // final file Name

		try {
			// Upload the file
			const { data: uploadData, error: uploadError } = await storage
				.from('cdn')
				.upload('achievements/' + uploadFileName, file);
			if (uploadError) {
				throw new Error(uploadError.message);
			}
			//
			console.log(uploadData);
			let path: string = uploadData.path;
			let bucket = 'cdn';
			let fullPath = PUBLIC_SUPABASE_URL + '/storage/v1/object/public/' + bucket + '/' + path;
			addAchievement(fullPath);
			// https://jplevtqqsjpdzeeesbax.supabase.co/storage/v1/object/public/cdn/dump/dummyFile.png
			// 		fullPath
			// :
			// "cdn/dump/dummyFile.png"
			// id
			// :
			// "6be30838-c513-472b-ae95-6a71b57a9d0e"
			// path
			// :
			// "dump/dummyFile.png"
		} catch (error) {
			alert(error.message);
		}
	}

	async function getAchievements() {
		console.log('Getting Achievements');
		try {
			let { data, error } = await supabase
				.from('achievements')
				.select('id, title, link, thumbnail');
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				achievements = data;
			}
		} catch (error) {
			alert(error.message);
			// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
			// return []; // Return an empty array if fetching fails
		}
	}
</script>

<!-- Title -->
<h2 class="flex items-center justify-start gap-2 text-3xl">
	Achievements
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
			>All the achievements on the homepage can be accessed here</Tooltip.Content
		>
	</Tooltip.Root>
</h2>

<hr class="m-2 border-2 border-muted-foreground" />

<!-- Form -->

<div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-4">
	<Label for="fileName">File name</Label>
	<Input
		name="fileName"
		placeholder="name of the file without extension"
		bind:value={fileName}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
	/>
	<Label for="title">Title</Label>
	<Input
		name="title"
		placeholder="title"
		bind:value={title}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
		required
	/>
	<Label for="link">Link</Label>
	<Input
		name="link"
		placeholder="Redirecting link"
		bind:value={link}
		class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
		required
	/>
	<Label for="quote">File</Label>
	<div class="flex items-center gap-2">
		<Input
			name="quote"
			type="file"
			id="file"
			bind:value={file}
			class="flex-1 border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0"
		/>
		{#if file}
			<Button class="bg-transparent">
				<Eye class="h-5 w-5" />
			</Button>
		{/if}
	</div>
	<Button class="col-span-2 mt-2" on:click={addThumbnail}>Add Achievements</Button>
</div>
<!-- database -->

<div class="mt-4 flex flex-col gap-2">
	<div class="flex justify-end gap-2">
		<Input
			name="searchInput"
			placeholder="Search an achievement"
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
					<Button on:click={getAchievements}>
						<RefreshCcw class="h-6 w-6 cursor-pointer" />
					</Button>
				</span>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Refresh the database</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if achievements.length > 0}
		<div class="grid grid-cols-4 items-center gap-2 overflow-x-auto rounded-lg bg-slate-800 p-4">
			<p class="col-span-1">id</p>
			<p class="col-span-2">Title</p>
			<p class="col-span-1"></p>
			{#each achievements as achievement (achievement.id)}
				{#if searchQuery === undefined || achievement.title
						.toLowerCase()
						.includes(searchQuery.toLowerCase())}
					<p class="col-span-1">{achievement.id}</p>
					<p class="col-span-2">{achievement.title}</p>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<span
								class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground"
								use:builder.action
								{...builder}
							>
								<Dialog.Root>
									<Dialog.Trigger class={buttonVariants({ variant: "default" })}>
										<ExternalLink class="h-4 w-4 rounded-md text-white" />
									</Dialog.Trigger>
									<Dialog.Content class="bg-black sm:max-w-[425px]">
										<img
											src={achievement.thumbnail}
											alt=""
											class=""
										/>
									</Dialog.Content>
								</Dialog.Root>
							</span>
						</Tooltip.Trigger>
						<Tooltip.Content side="right">Preview the Image</Tooltip.Content>
					</Tooltip.Root>
				{/if}
			{/each}
		</div>
	{/if}
</div>
