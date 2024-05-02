import type { ComponentType } from 'svelte';
import Trophy from 'lucide-svelte/icons/trophy';
import Smartphone from 'lucide-svelte/icons/smartphone';
import CloudUpload from 'lucide-svelte/icons/cloud-upload';
import ClipboardList from 'lucide-svelte/icons/clipboard-list';
import type { Icon } from 'lucide-svelte';

type service = {
	title: string;
	href: string;
	icon?: ComponentType<Icon>;
};
export const services: service[] = [
	{
		title: 'Achievements',
		href: '/admin/dashboard/services/achievements',
		icon: Trophy
	},
	{
		title: 'Social Media Post',
		href: '/admin/dashboard/services/social-media',
		icon: Smartphone
	},
	{
		title: 'Testimonials',
		href: '/admin/dashboard/services/testimonials'
	},
	{
		title: 'CDN',
		href: '/admin/dashboard/services/cdn',
		icon: CloudUpload
	},
	{
		title: 'Notices',
		href: '/admin/dashboard/services/notices',
		icon: ClipboardList
	},
];
