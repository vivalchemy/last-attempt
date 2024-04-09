<script lang="ts">
	import Home from 'lucide-svelte/icons/home';
	import * as Tooltip from '$lib/components/ui/tooltip';
	// import { redirect } from '@sveltejs/kit';

	// icons
	import Database from 'lucide-svelte/icons/database';
	import Cog from 'lucide-svelte/icons/cog';
	import BarChart3 from 'lucide-svelte/icons/bar-chart-3';
	import LogOut from 'lucide-svelte/icons/log-out';

	//types
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	type MenuItem = {
		name: string;
		href: string;
		icon: ComponentType<Icon>;
	};
	const menuItems: MenuItem[] = [
		{
			name: 'Database',
			href: 'dashboard/services/achievements',
			icon: Cog
		},
		{
			name: 'database',
			href: 'https://supabase.com/dashboard/project/jplevtqqsjpdzeeesbax',
			icon: Database
		}
	];
</script>

<div class="flex">
	<aside
		class="fixed inset-y-0 left-0 z-10 m-4 hidden w-14 flex-col rounded-full bg-slate-900 px-4 py-1 sm:flex"
	>
		<nav class="flex flex-col items-center gap-4 px-2 py-4">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/"
						class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-foreground transition-colors hover:text-background md:h-8 md:w-8"
						use:builder.action
						{...builder}
					>
						<Home class="h-5 w-5" />
						<span class="sr-only">Home</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Home</Tooltip.Content>
			</Tooltip.Root>
			{#each menuItems as item}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href={item.href.startsWith('https') ? item.href : '/admin/' + item.href}
							class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<svelte:component this={item.icon} class="h-5 w-5" />
							<span class="sr-only">{item.name}</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">{item.name}</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/admin"
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-background md:h-8 md:w-8"
						use:builder.action
						{...builder}
					>
						<LogOut class="h-5 w-5" />
						<span class="sr-only">Logout</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Logout</Tooltip.Content>
			</Tooltip.Root>
		</nav>
	</aside>
	<div
		class="inset-y-0 left-0 z-0 mx-4 my-4 hidden w-14 flex-col rounded-full px-4 py-1 sm:flex"
	></div>
	<slot />
</div>
