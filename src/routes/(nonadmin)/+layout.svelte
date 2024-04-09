<script lang="ts">
	import { BrainCircuit, Computer, GraduationCapIcon, Home, MessageCircle, User } from 'lucide-svelte';
	import FloatingNavbar from '$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte';
	import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	type navItem = {
		name: string;
		link: string;
		icon: ComponentType<Icon>;
		submenu?: navItem[];
	};

	const navItems: navItem[] = [
		{
			name: 'Home',
			link: '/',
			icon: Home
		},
		{
			name: 'About',
			link: '/about',
			icon: User
		},
		{
			name: 'Academics',
			link: '/academics',
			icon: GraduationCapIcon,
			submenu: [
				{
					name: 'Computer',
					link: '/computer',
					icon: Computer
				},
				{
					name: 'AIDS',
					link: '/aids',
					icon: BrainCircuit
				}
			]
		},
		{
			name: 'Admission',
			link: '/admission',
			icon: MessageCircle
		}
	];
</script>

<Navbar {navItems} />
<div class="relative w-full">
	<FloatingNavbar {navItems} />
</div>

<slot />
