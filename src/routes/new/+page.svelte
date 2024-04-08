<script>
	import supabase from '$lib/supabase/config';
	let storage = supabase.storage;
	let file;
	async function previewFile() {
		const fileInput = document.getElementById('fileInput');
		file = fileInput.files[0]; // Get the first selected file

		if (!file) {
			alert('Please select a file');
			return;
		}
	}
	async function uploadFile() {
		const fileInput = document.getElementById('fileInput');
		file = fileInput.files[0]; // Get the first selected file

		if (!file) {
			alert('Please select a file');
			return;
		}
		//
		try {
			// Upload the file
			const { data: uploadData, error: uploadError } = await storage
				.from('cdn')
				.upload('resumes/someFile.png', file);
			//
			if (uploadError) {
				throw new Error(uploadError.message);
			}
			//
			console.log(uploadData);
			//
			// 		// // Generate a signed URL for the uploaded file
			// 		// const { signedURL, error: signError } = await storage
			// 		// 	.from('cdn')
			// 		// 	.createSignedUrl('resumes/someFile.jpg', 60); // 60 seconds expiry
			// 		//
			// 		// if (signError) {
			// 		// 	throw new Error(signError.message);
			// 		// }
			// 		//
			// 		// console.log(signedURL);
		} catch (error) {
			alert(error.message);
		}
	}
</script>

<h1 class="text-3xl">Upload File</h1>
<input type="file" id="fileInput" accept="image/*" class="bg-primary p-4 text-white" />
{#if !file}
	<h3>Please select a file</h3>
{/if}
{#if file}
	<img src={URL.createObjectURL(file)} alt="" class="h-auto w-[400px]" />
	<!-- <pre> -->
	<!-- {JSON.parse(file, null, 2)} -->
	<!-- </pre> -->
{/if}
<button on:click={previewFile} class="bg-primary text-white p-4 rounded-sm">Preview</button>
<button on:click={uploadFile} class="bg-primary text-white p-4 rounded-sm">Upload</button>
