<!-- Navbar.svelte -->
<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Search } from 'lucide-svelte';
	import { page } from '$app/stores';

	type navItem = {
		name: string;
		link: string;
		icon: ComponentType<Icon>;
		submenu?: navItem[];
	};
	export let navItems: navItem[];
	let isActive: boolean;
</script>

<nav
	class="flex w-full
		 items-center justify-between px-8 py-2 text-background shadow-lg backdrop-blur"
>
	<img
		class="mr-4 h-12 w-auto"
		src="https://fragnel.edu.in/images/crce/logos/crcelogo.jpg"
		alt="College Logo"
	/>

	<ul class="flex items-center space-x-8">
		{#each navItems as navItem}
			{#if !navItem.submenu}
				{@const isActive = $page.url.pathname.startsWith(navItem.link) && navItem.link !== '/'}
				<li
					class="cursor-pointer rounded-sm px-4 py-1 hover:text-primary {isActive &&
						'bg-slate-800'}"
				>
					<a href={navItem.link}>{navItem.name}</a>
				</li>
			{:else}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>{navItem.name}</DropdownMenu.Trigger>
					<DropdownMenu.Content class="bg-slate-900 border-0 text-white">
						<DropdownMenu.Group>
							<DropdownMenu.Label>{navItem.name}</DropdownMenu.Label>
							<DropdownMenu.Separator class="bg-slate-800"/>
							{#each navItem.submenu as subNavItem}
								<a href={navItem.link + subNavItem.link}>
									<DropdownMenu.Item class="hover:bg-slate-800">
										{subNavItem.name}
									</DropdownMenu.Item>
								</a>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		{/each}
	</ul>

	<ul class="flex items-center space-x-6">
		<a href="/a-z/">
			<Search size="24" class="text-primary-background" />
		</a>
		<Button variant="default"><a href="/dummy">Contact Us</a></Button>
	</ul>
</nav>
