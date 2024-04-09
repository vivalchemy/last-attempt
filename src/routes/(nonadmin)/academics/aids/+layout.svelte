<script lang="ts">
	import HoverNavbar from '$lib/components/ui/HoverNavbar/HoverNavbar.svelte';

	type Example = {
		name: string;
		href: string;
		label?: string;
	};
	export const examples: Example[] = [
		{
			name: 'Contact',
			href: '/about/contact',
		},
		{
			name: 'Director',
			href: '/about/director',
		},
		{
			name: 'Frcrce',
			href: '/about/frcrce',
		},
		{
			name: 'Principal',
			href: '/about/principal',
		},
		{
			name: 'Vision and Mission',
			href: '/about/vision-mission',
		},
	];
</script>

<HoverNavbar {examples} class="mt-2 mx-4" />
<div class="overflow-y-auto mx-4 p-4 bg-slate-900 rounded-md">
<slot/>
</div>
