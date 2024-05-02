import type { PageServerLoad } from './$types';
import supabase from '$lib/supabase/config';

let achievements = [];
let posts = [];
let testimonials = [];
let notices = [];

achievements = [
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

testimonials = [
	{
		quote:
			'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
		name: 'Charles Dickens'
		// title: 'A Tale of Two Cities'
	},
	{
		quote:
			"To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
		name: 'William Shakespeare'
		// title: 'Hamlet'
	},
	{
		quote: 'All that we see or seem is but a dream within a dream.',
		name: 'Edgar Allan Poe'
		// title: 'A Dream Within a Dream'
	},
	{
		quote:
			'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
		name: 'Jane Austen'
		// title: 'Pride and Prejudice'
	},
	{
		quote:
			'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
		name: 'Herman Melville'
		// title: 'Moby-Dick'
	}
];

posts = [
	{ id: 1, platform: 'Instagram', url: 'https://www.instagram.com/p/123456789/' },
	{ id: 2, platform: 'Twitter', url: 'https://twitter.com/username/status/987654321' },
	{ id: 4, platform: 'Facebook', url: 'https://twitter.com/username/status/987654321' },
	{
		id: 3,
		platform: 'LinkedIn',
		url: 'https://www.linkedin.com/posts/username/content-title-123456789'
	}
];

notices = [
	{
		id: 1,
		title: 'Meeting Tomorrow',
		description:
			"Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
		link: 'mailto:williamsmith@example.com',
		created_at: '2023-10-22T09:00:00'
	},
	{
		id: 2,
		title: 'Re: Project Update',
		description:
			"Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
		link: 'mailto:alicesmith@example.com',
		created_at: '2023-10-22T10:30:00'
	},
	{
		id: 3,
		title: 'Weekend Plans',
		description:
			"Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
		link: 'mailto:bobjohnson@example.com',
		created_at: '2023-04-10T11:45:00'
	},
	{
		id: 4,
		title: 'Re: Question about Budget',
		description:
			"I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
		link: 'mailto:emilydavis@example.com',
		created_at: '2023-03-25T13:15:00'
	},
	{
		id: 5,
		title: 'Important Announcement',
		description:
			"I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.\n\nThis change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.\n\nRegards, Michael",
		link: 'mailto:michaelwilson@example.com',
		created_at: '2023-03-10T15:00:00'
	},
	{
		id: 6,
		title: 'Re: Feedback on Proposal',
		description:
			"Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.\n\nI've attached the revised proposal for your review.\n\nPlease let me know if you have any further comments or suggestions. Looking forward to your response.\n\nBest regards, Sarah",
		link: 'mailto:sarahbrown@example.com',
		created_at: '2023-02-15T16:30:00'
	},
	{
		id: 7,
		title: 'New Project Idea',
		description:
			"I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months.\n\nI've prepared a detailed proposal outlining the potential benefits and the strategy for execution.\n\nThis project has the potential to significantly impact our business positively. Let's set up a meeting to dive into the details and determine if it aligns with our current goals.\n\nBest regards, David",
		link: 'mailto:davidlee@example.com',
		created_at: '2023-01-28T17:45:00'
	},
	{
		id: 8,
		title: 'Vacation Plans',
		description:
			"Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options.\n\nI believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.\n\nWe can start making arrangements to ensure a smooth and enjoyable trip.\n\nExcited to hear your thoughts! Olivia",
		link: 'mailto:oliviawilson@example.com',
		created_at: '2022-12-20T18:30:00'
	},
	{
		id: 9,
		title: 'Re: Conference Registration',
		description:
			"I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
		link: 'mailto:jamesmartin@example.com',
		created_at: '2022-11-30T19:15:00'
	},
	{
		id: 10,
		title: 'Team Dinner',
		description:
			"Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.\n\nI've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.\n\nPlease confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!\n\nBest, Sophia",
		link: 'mailto:sophiawhite@example.com',
		created_at: '2022-11-05T20:30:00'
	}
];

async function getNotices() {
	console.log('Getting notices');
	try {
		let { data, error } = await supabase.from('notices').select();
		if (error) {
			alert(error.message);
		}
		console.log(data);
		if (data) {
			notices = data;
		}
	} catch (error) {
		alert(error.message);
		// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
		// return []; // Return an empty array if fetching fails
	}
}

async function getAchievements() {
	console.log('Getting Achievements');
	try {
		const { data, error } = await supabase
			.from('achievements')
			.select('id, title, link, thumbnail');
		if (error) {
			alert(error.message);
		}
		console.log(data);
		if (data) {
			achievements = data;
		}
	} catch (error) {
		alert(error.message);
		// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
		// return []; // Return an empty array if fetching fails
	}
}

async function getPosts() {
	console.log('Getting Posts');
	try {
		const { data, error } = await supabase.from('posts').select('id, platform, url');
		if (error) {
			alert(error.message);
		}
		console.log(data);
		if (data) {
			posts = data;
		}
	} catch (error) {
		alert(error.message);
		// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
		// return []; // Return an empty array if fetching fails
	}
}

async function getTestimonials() {
	console.log('Getting testimonials');
	try {
		const { data, error } = await supabase.from('testimonials').select('id, name, quote');
		if (error) {
			alert(error.message);
		}
		console.log(data);
		if (data) {
			testimonials = data;
		}
	} catch (error) {
		alert(error.message);
		// You can handle the error in a more appropriate way here, such as logging or displaying it in the UI
		// return []; // Return an empty array if fetching fails
	}
}

export async function load(): Promise<PageServerLoad> {
	// getPosts();
	// getAchievements();
	// getTestimonials();
	return {
		achievements,
		posts,
		testimonials,
		notices
	};
}
