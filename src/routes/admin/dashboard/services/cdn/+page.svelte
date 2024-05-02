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
	import { Eye } from 'lucide-svelte';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';

	let storage = supabase.storage;
	let description: string;
	let fileName: string;
	let fileExt: string;
	let uploadFileName: string;
	let file: File;
	let searchQuery: string;
	type typeFile = {
		id: number;
		description: string;
		href: string;
	};
	let files: typeFile[] = [];
	$: console.log(files);
	onMount(() => {
		getCdn();
	})
	async function uploadFileDetails(href: string) {
		try {
			const { data, error } = await supabase.from('cdn').insert([{ description, href }]);
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				files = data;
			}
		} catch (error) {
			alert(error.message);
		}
	}

	async function addFile() {
		if (description == null || description == '' || !description.trim()) {
			alert('Please fill the description first');
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
				.upload('dump/' + uploadFileName, file);
			if (uploadError) {
				throw new Error(uploadError.message);
			}
			//
			console.log(uploadData);
			let path: string = uploadData.path;
			let bucket = 'cdn';
			let fullPath = PUBLIC_SUPABASE_URL + '/storage/v1/object/public/' + bucket + '/' + path;
			uploadFileDetails(fullPath);
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

	async function getCdn() {
		console.log('Getting Cdn files');
		try {
			let { data, error } = await supabase.from('cdn').select('id, description, href');
			if (error) {
				alert(error.message);
			}
			console.log(data);
			if (data) {
				files = data;
			}
		} catch (error) {
			alert(error.message);
			// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
			// return []; // Return an empty array if fetching fails
		}
	}

	async function deleteFile(id: number) {
		console.log(id);
	}
</script>

<!-- Title -->
<h2 class="flex items-center justify-start gap-2 text-3xl">
	Publicly available files
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
			>These are the publicly available file on the website</Tooltip.Content
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
	<Label for="description">Description</Label>
	<Input
		name="description"
		placeholder="description"
		bind:value={description}
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
	<Button class="col-span-2 mt-2" on:click={addFile}>Add File</Button>
</div>
<!-- database -->

<div class="mt-4 flex flex-col gap-2">
	<div class="flex justify-end gap-2">
		<Input
			name="searchInput"
			placeholder="Search a file"
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
					<Button on:click={getCdn}>
						<RefreshCcw class="h-6 w-6 cursor-pointer" />
					</Button>
				</span>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Refresh the database</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if files.length > 0}
		<div class="grid grid-cols-6 gap-2 overflow-x-auto rounded-lg bg-slate-800 p-4">
			<p class="col-span-1">id</p>
			<p class="col-span-2">Description</p>
			<p class="col-span-3">Link</p>
			<!-- <p class="col-span-1"></p> -->
			{#each files as file (file.id)}
				{#if searchQuery === undefined || file.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase())}
					<p class="col-span-1">{file.id}</p>
					<p class="col-span-2 break-all">{file.description}</p>
					<p class="col-span-3 break-all">{file.href}</p>
					<!-- <Tooltip.Root> -->
					<!-- 	<Tooltip.Trigger asChild let:builder> -->
					<!-- 		<span -->
					<!-- 			class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground" -->
					<!-- 			use:builder.action -->
					<!-- 			{...builder} -->
					<!-- 		> -->
					<!-- 			<Button -->
					<!-- 				on:click={() => { -->
					<!-- 					// console.log(file.id); -->
					<!-- 					deleteFile(file.id); -->
					<!-- 				}} -->
					<!-- 				class="col-span-1 bg-transparent" -->
					<!-- 			> -->
					<!-- 				<Trash2 class="h-4 w-4 rounded-md text-white" /> -->
					<!-- 			</Button> -->
					<!-- 		</span> -->
					<!-- 	</Tooltip.Trigger> -->
					<!-- 	<Tooltip.Content side="right">Delete the entry from the database</Tooltip.Content> -->
					<!-- </Tooltip.Root> -->
				{/if}
			{/each}
		</div>
	{/if}
</div>
