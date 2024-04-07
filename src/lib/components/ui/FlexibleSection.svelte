<!-- FlexibleSection.svelte -->
<script>
	import Button from '../ui/button/button.svelte';

	let className = '';

	export let reverse = false;
	export let src = '';
	export let alt = '';
	export let heading = 'Your Heading';
	export let subheading = 'Your Subheading';
	export { className as class };
	export let buttonText = '';
	export let buttonHref = '/';
</script>

<div
	class="flex flex-wrap {reverse
		? 'flex-row-reverse'
		: 'flex-row'} h-70vh {className} items-center justify-center"
>
	<div class="flex flex-1 items-center justify-center">
		<img class=" mr-16 h-auto min-w-[240px] max-w-full rounded-3xl shadow-2xl" {src} {alt} />
	</div>
	<div class="flex flex-1 flex-col justify-center p-8">
		<div>
			<h2 class="text-3xl font-bold">{heading}</h2>
			<p class="text-md mt-4">{subheading}</p>
		</div>
		{#if buttonText !== ''}
			<a href={buttonHref} class="w-[200px]">
				<Button class="text-lg">{buttonText}</Button>
			</a>
		{/if}
	</div>
</div>
