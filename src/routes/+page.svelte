<script lang="ts">
	import FlexibleSection from '$lib/components/ui/FlexibleSection.svelte';
	import HeroParallax from '$lib/components/ui/HeroParallax/HeroParallax.svelte';
	import InfiniteMovingCards from '$lib/components/ui/InfiniteMovingCards/InfiniteMovingCards.svelte';
	import Sparkles from '$lib/components/ui/Sparkles/Sparkles.svelte';
	import { GraduationCapIcon, Home, MessageCircle, User } from 'lucide-svelte';
	import FloatingNavbar from '$lib/components/ui/FloatingNavbar/FloatingNavbar.svelte';
	import Navbar from '$lib/components/ui/Navbar/Navbar.svelte';

	const navItems = [
		{
			name: 'Home',
			link: '/',
			icon: Home
		},
		{
			name: 'About',
			link: '/',
			icon: User
		},
		{
			name: 'Academics',
			link: '/',
			icon: GraduationCapIcon
		},
		{
			name: 'Admissions',
			link: '/',
			icon: MessageCircle
		}
	];

	const products = [
		{
			title: 'Moonbeam',
			link: 'https://gomoonbeam.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/moonbeam.png'
		},
		{
			title: 'Cursor',
			link: 'https://cursor.so',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/cursor.png'
		},
		{
			title: 'Rogue',
			link: 'https://userogue.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/rogue.png'
		},

		{
			title: 'Editorially',
			link: 'https://editorially.org',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/editorially.png'
		},
		{
			title: 'Editrix AI',
			link: 'https://editrix.ai',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/editrix.png'
		},
		{
			title: 'Pixel Perfect',
			link: 'https://app.pixelperfect.quest',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/pixelperfect.png'
		},

		{
			title: 'Algochurn',
			link: 'https://algochurn.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/algochurn.png'
		},
		{
			title: 'Aceternity UI',
			link: 'https://ui.aceternity.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/aceternityui.png'
		},
		{
			title: 'Tailwind Master Kit',
			link: 'https://tailwindmasterkit.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png'
		},
		{
			title: 'SmartBridge',
			link: 'https://smartbridgetech.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/smartbridge.png'
		},
		{
			title: 'Renderwork Studio',
			link: 'https://renderwork.studio',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/renderwork.png'
		},

		{
			title: 'Creme Digital',
			link: 'https://cremedigital.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/cremedigital.png'
		},
		{
			title: 'Golden Bells Academy',
			link: 'https://goldenbellsacademy.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png'
		},
		{
			title: 'Invoker Labs',
			link: 'https://invoker.lol',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/invoker.png'
		},
		{
			title: 'E Free Invoice',
			link: 'https://efreeinvoice.com',
			thumbnail: 'https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png'
		}
	];

	const testimonials = [
		{
			quote:
				'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
			name: 'Charles Dickens',
			// title: 'A Tale of Two Cities'
		},
		{
			quote:
				"To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
			name: 'William Shakespeare',
			// title: 'Hamlet'
		},
		{
			quote: 'All that we see or seem is but a dream within a dream.',
			name: 'Edgar Allan Poe',
			// title: 'A Dream Within a Dream'
		},
		{
			quote:
				'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
			name: 'Jane Austen',
			// title: 'Pride and Prejudice'
		},
		{
			quote:
				'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
			name: 'Herman Melville',
			// title: 'Moby-Dick'
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
	<HeroParallax {products} {HeroText} {HeroDescription} />
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

<div
	class="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-950"
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

<InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
