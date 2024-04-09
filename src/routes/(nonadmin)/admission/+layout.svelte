<script lang="ts">
	import HoverNavbar from '$lib/components/ui/HoverNavbar/HoverNavbar.svelte';

	type Example = {
		name: string;
		href: string;
		label?: string;
	};
	export const examples: Example[] = [
		{
			name: 'Under Graduate',
			href: '/admission/ug',
		},
		{
			name: 'Post Graduate',
			href: '/admission/pg',
		},
		{
			name: 'PHD',
			href: '/admission/phd',
		},
	];
</script>

<HoverNavbar {examples} class="mt-2 mx-4" />
<div class="overflow-y-auto mx-4 p-4 bg-slate-900 rounded-md">
<slot/>
</div>
