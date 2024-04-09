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
			href: '/about/contact'
		},
		{
			name: 'Director',
			href: '/about/director'
		},
		{
			name: 'FRCRCE',
			href: '/about/frcrce'
		},
		{
			name: 'Principal',
			href: '/about/principal'
		},
		{
			name: 'Vision and Mission',
			href: '/about/vision-mission'
		},
		{
			name: 'Mandatory Disclosure',
			href: '/about/mandatory-disclosure'
		},
		{
			name: 'Governance',
			href: '/about/governance'
		}
	];
</script>

<HoverNavbar {examples} class="mx-4 mt-2" />
<div class=" m-4 mb-4  rounded-md bg-slate-900 p-4">
	<slot />
</div>
