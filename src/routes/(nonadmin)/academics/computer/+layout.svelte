<script lang="ts">
	import HoverNavbar from '$lib/components/ui/HoverNavbar/HoverNavbar.svelte';

	type Example = {
		name: string;
		href: string;
		label?: string;
	};
	export const examples: Example[] = [
		{
			name: 'About',
			href: '/academics/computer/about'
		},
		{
			name: 'HOD',
			href: '/academics/computer/hod'
		},
		{
			name: 'Vision Mission',
			href: '/academics/computer/vision-mission'
		},
		{
			name: 'Placements',
			href: '/academics/computer/placement-data'
		},
		{
			name: 'Faculty',
			href: '/academics/computer/faculty-members'
		},
		{
			name: 'Supporting staff',
			href: '/academics/computer/supporting-staff'
		}
	];
</script>

<HoverNavbar {examples} class="mx-4 mt-2" />
<div class="mx-4 overflow-y-auto rounded-md bg-slate-900 p-4">
	<slot />
</div>
