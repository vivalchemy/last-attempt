<script lang="ts">
	import FlexibleSection from '$lib/components/ui/FlexibleSection.svelte';
	import HeroParallax from '$lib/components/ui/HeroParallax/HeroParallax.svelte';
	import InfiniteMovingCards from '$lib/components/ui/InfiniteMovingCards/InfiniteMovingCards.svelte';
	import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
	import MailList from '$lib/components/ui/mail-list/MailList.svelte';
	import GridAndDotBackgrounds from '$lib/components/ui/GridAndDotBackground/+GridAndDotBackgrounds.svelte';
	import {
		BrainCircuit,
		Computer,
		GraduationCapIcon,
		Home,
		MessageCircle,
		User
	} from 'lucide-svelte';
	import FloatingNavbar from '$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte';
	import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import Instagram from 'lucide-svelte/icons/instagram';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Twitter from 'lucide-svelte/icons/twitter';
	import Facebook from 'lucide-svelte/icons/facebook';
	import Ig from '$lib/components/Ig.svelte';

	export let data;
	let { achievements, testimonials, posts, notices } = data;
	console.log(data);
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

	let HeroText = 'Fr. Conceicao Rodrigues College of Engineering';
	let HeroDescription = 'Moulding engineers who build the nation';
</script>

<Navbar {navItems} />
<div class="relative w-full">
	<FloatingNavbar {navItems} />
</div>
<div class="w-100vw container mx-auto mt-8">
	<HeroParallax products={achievements} {HeroText} {HeroDescription} />
</div>

<FlexibleSection
	src="https://fragnel.edu.in/images/2021/10/2-page-1-crce-building.png"
	class="mx-16 my-32"
	heading="About FrCRCE"
	buttonText="Read more"
	buttonHref="about"
	subheading="The Institute started with only one programme in Production Engineering in 1984 with an intake capacity of 60 students. In 1987, the programme in Electronics Engineering was started with an intake capacity of 60 students followed by Computer Engineering in 1991 with an intake capacity of 60 students. In 2001, the programme in Information Technology was started with an intake capacity of 30 students which was later increased to 60 in 2010. The College started offering Master’s ... "
/>

<!-- TODO: Latest posts-->
<GridAndDotBackgrounds>
	<p
		class="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl"
	>
		Latest
	</p>
	<div class="mx-4 flex w-full min-w-[400px] flex-wrap gap-4 justify-around">
		<Ig/>
		<!-- <div class="grid min-h-20 gap-2 p-4 sm:grid-cols-1 lg:grid-cols-2" style="flex:3"> -->
		<!-- 	{#each posts as post} -->
		<!-- 		{#if post.platform === 'Instagram'} -->
		<!-- 			<a -->
		<!-- 				href={'https://www.instagram.com/' + post.url} -->
		<!-- 				class="flex h-full w-full items-end justify-center gap-2 rounded-lg border-2 border-white p-4" -->
		<!-- 			> -->
		<!-- 				<Instagram class="h-10 w-10" /> -->
		<!-- 				<p class="text-2xl">{post.platform}</p> -->
		<!-- 			</a> -->
		<!-- 		{:else if post.platform === 'Twitter'} -->
		<!-- 			<a -->
		<!-- 				href={post.url} -->
		<!-- 				class="flex h-full w-full items-end justify-center gap-2 rounded-lg border-2 border-white p-4" -->
		<!-- 			> -->
		<!-- 				<Twitter class="h-10 w-10" /> -->
		<!-- 				<p class="text-2xl">{post.platform}</p> -->
		<!-- 			</a> -->
		<!-- 		{:else if post.platform === 'LinkedIn'} -->
		<!-- 			<a -->
		<!-- 				href={'https://www.linkedin.com/posts/' + post.url} -->
		<!-- 				class="flex h-full w-full items-end justify-center gap-2 rounded-lg border-2 border-white p-4" -->
		<!-- 			> -->
		<!-- 				<Linkedin class="h-10 w-10" /> -->
		<!-- 				<p class="text-2xl">{post.platform}</p> -->
		<!-- 			</a> -->
		<!-- 		{:else if post.platform === 'Facebook'} -->
		<!-- 			<a -->
		<!-- 				href={'https://www.linkedin.com/posts/' + post.url} -->
		<!-- 				class="flex h-full w-full items-end justify-center gap-2 rounded-lg border-2 border-white p-4" -->
		<!-- 			> -->
		<!-- 				<Facebook class="h-10 w-10" /> -->
		<!-- 				<p class="text-2xl">{post.platform}</p> -->
		<!-- 			</a> -->
		<!-- 		{/if} -->
		<!-- 	{/each} -->
		<!-- </div> -->
		<!-- TODO: Notices -->
		<div class="min-h-[30rem] bg-slate-800 rounded-lg p-4 h-auto w-[40rem]">
			<MailList {notices} />
		</div>
	</div>
</GridAndDotBackgrounds>

<div
	class="mt-16 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-950"
>
	<h3 class="relative z-20 text-center text-xl font-bold text-white md:text-7xl lg:text-7xl">
		Testimonials
	</h3>
	<div class="relative h-32 w-[40rem]">
		<!-- Gradients -->
		<div
			class="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
		/>
		<div
			class="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
		/>
		<div
			class="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"
		/>
		<div
			class="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
		/>

		<!-- Core component -->
		<Sparkles
			minSize={0.8}
			maxSize={2}
			particleDensity={300}
			className="w-full h-full"
			particleColor="#FFFFFF"
		/>

		<!-- Radial Gradient to prevent sharp edges -->
		<div
			class="absolute inset-0 h-full w-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"
		></div>
	</div>
</div>

<InfiniteMovingCards items={testimonials} direction="right" speed="slow" className="mb-32" />
