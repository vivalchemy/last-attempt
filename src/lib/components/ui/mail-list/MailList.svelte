<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	const DIVISIONS = [
		{ amount: 60, name: 'seconds' },
		{ amount: 60, name: 'minutes' },
		{ amount: 24, name: 'hours' },
		{ amount: 7, name: 'days' },
		{ amount: 4.34524, name: 'weeks' },
		{ amount: 12, name: 'months' },
		{ amount: Number.POSITIVE_INFINITY, name: 'years' }
	] as const;

	const formatter = new Intl.RelativeTimeFormat(undefined, {
		numeric: 'auto'
	});

	export function formatTimeAgo(date: Date) {
		console.log(date);
		let duration = (date.getTime() - new Date().getTime()) / 1000;

		for (let i = 0; i <= DIVISIONS.length; i++) {
			const division = DIVISIONS[i];
			if (Math.abs(duration) < division.amount) {
				return formatter.format(Math.round(duration), division.name);
			}
			duration /= division.amount;
		}
	}

	type Notice = {
		id: number;
		title: string;
		description: string;
		link: string;
		created_at: Date;
	};

	export let notices: Notice[];
</script>

<p class="mb-2 flex justify-center text-xl">Notices</p>
<ScrollArea class="h-[30rem]">
	<div class="flex flex-col gap-2 p-4 pt-0">
		{#each notices as notice (notice.id)}
			<a
				href={notice.link}
				class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-slate-900"
			>
				<!-- <div class="flex w-full flex-col gap-1"> -->
				<div class="flex w-full items-center">
					<div class="flex items-center gap-2">
						<div class="font-semibold">{notice.title}</div>
					</div>
					<div class="ml-auto text-xs text-muted-foreground">
						{formatTimeAgo(new Date(notice.created_at))}
					</div>
				</div>
				<!-- </div> -->
				<div class="line-clamp-2 text-xs text-muted-foreground">
					{notice.description.substring(0, 300)}
				</div>
			</a>
		{/each}
	</div>
</ScrollArea>
