<!-- Navbar.svelte -->
<script lang="ts">
	import type { ComponentType } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Search } from 'lucide-svelte';
	// import { page } from '$app/stores';

	// let url = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));

	export let navItems: { name: string; link: string; icon?: ComponentType }[];
	// console.log(url);
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
			<li class="cursor-pointer hover:bg-slate-800 px-4 py-1 rounded-sm active:text-primary"><a href={navItem.link}>{navItem.name}</a></li>
		{/each}
		<!-- <li><a href="/">Home</a></li> -->
		<!-- <li><a href="/about">About</a></li> -->
		<!-- <li><a href="/academics">Academics</a></li> -->
		<!-- <li><a href="/admissions"> Admissions</a></li> -->
	</ul>

	<ul class="flex items-center space-x-6">
		<a href="/a-z/">
			<Search size="24" class="text-primary-background" />
		</a>
		<Button variant="default"><a href="/dummy">Contact Us</a></Button>
	</ul>
</nav>
