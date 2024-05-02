<script lang="ts">
  import supabase from '$lib/supabase/config';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
  import Info from 'lucide-svelte/icons/info';
  import { onMount } from 'svelte';
  import { Button , buttonVariants} from '$lib/components/ui/button';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { tick } from 'svelte';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import Check from 'lucide-svelte/icons/check';
  import { cn } from '$lib/utils.js';
  import ExternalLink from 'lucide-svelte/icons/external-link';
  
  let student_name: string = "";
  let student_id: number;
  let proof: string = "";
  let achievements: string = "";
  let searchQuery: string = "";

  type Achievement = {
    student_name: string;
    student_id: number;
    branch: "Comps" | "AIDS" | "ECS" | "Mech";
    year: 1 | 2 | 3 | 4;
    achievements: string;
    proof: string;
  };

  const branchList = [
    {
      label: "Computer Engineering",
      value: "Comps",
    },
    {
      label: "Artificial Intelligence and Data Science",
      value: "AIDS",
    },
    {
      label: "Electronics and Computer Science",
      value: "ECS",
    },
    {
      label: "Mechanical Engineering",
      value: "Mech",
    }
  ];

  const yearList = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    }
  ];

  let branchOpen: boolean = false;
  let branchValue: string = '';
  let yearOpen: boolean = false;
  let yearValue: number | undefined = undefined;

  let studentAchievements: Achievement[] = [];

  function closeAndFocusTrigger(triggerId: string) {
    branchOpen = false;
    tick().then(() => {
      const trigger = document.getElementById(triggerId);
      if (trigger) trigger.focus();
    });
  }

  function closeAndFocusTriggerYear(triggerId: string) {
    yearOpen = false;
    tick().then(() => {
      const trigger = document.getElementById(triggerId);
      if (trigger) trigger.focus();
    });
  }

  async function addAchievement() {
    try {
      const { data, error } = await supabase
        .from('student_achievements')
        .insert([{ student_id, student_name, branch: selectedBranch, achievements, proof, year: selectedYear }]);
      if (error) {
        alert(error.message);
      }
      if (data) {
        studentAchievements = data;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function getAchievements() {
    try {
      const { data, error } = await supabase
        .from('student_achievements')
        .select('student_id, student_name, branch, year, achievements, proof');
      if (error) {
        alert(error.message);
      }
      if (data) {
        studentAchievements = data;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  $: selectedBranch = branchList.find(f => f.value === branchValue)?.value ?? 'Select branch...';
  $: selectedYear = yearList.find(f => f.value === yearValue)?.value ?? 'Select year...';

  $: console.log(selectedBranch);
  $: console.log(selectedYear);

  // onMount(() => {
  //   getAchievements();
  // })
</script>

<!-- Title -->
<h2 class="flex items-center justify-start gap-2 text-3xl">
  Student Achievements
  <Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <span class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground md:h-8 md:w-8" use:builder.action {...builder}>
        <Info class="h-5 w-5" />
      </span>
    </Tooltip.Trigger>
    <Tooltip.Content side="right">All the achievements on the homepage can be accessed here</Tooltip.Content>
  </Tooltip.Root>
</h2>

<hr class="m-2 border-2 border-muted-foreground" />

<!-- Form -->

<div class="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-4">
  <Label for="studentName">Student name</Label>
  <Input name="studentName" placeholder="Student Name" bind:value={student_name} class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0" />

  <Label for="studentId">Student Id</Label>
  <Input name="studentId" placeholder="Student Id" bind:value={student_id} type="number" class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0" />

  <Label for="name">Select branch</Label>
  <!-- Branch Selection -->
  <Popover.Root bind:open={branchOpen} let:ids>
    <Popover.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" role="combobox" aria-expanded={branchOpen} class="w-[200px] justify-between border-none bg-slate-900 hover:bg-slate-700 hover:text-white">
        {selectedBranch}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[200px] border-none p-0">
      <Command.Root class="border-2 border-slate-400 bg-slate-700 text-white">
        <Command.Input placeholder="Search Branch..." />
        <Command.Empty>No Branch Found</Command.Empty>
        <Command.Group>
          {#each branchList as branch}
            <Command.Item value={branch.value} onSelect={(currentValue) => { branchValue = currentValue; closeAndFocusTrigger(ids.trigger); }} class="text-white aria-selected:bg-slate-900 aria-selected:text-white">
              <Check class={cn('mr-2 h-4 w-4', branchValue !== branch.value && 'text-transparent')} />
              {branch.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>

  <Label for="name">Select Year</Label>
  <!-- Year Selection -->
  <Popover.Root bind:open={yearOpen} let:ids>
    <Popover.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" role="combobox" aria-expanded={yearOpen} class="w-[200px] justify-between border-none bg-slate-900 hover:bg-slate-700 hover:text-white">
        {selectedYear}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[200px] border-none p-0">
      <Command.Root class="border-2 border-slate-400 bg-slate-700 text-white">
        <Command.Input placeholder="Search Year..." />
        <Command.Empty>No Year Found</Command.Empty>
        <Command.Group>
          {#each yearList as year}
            <Command.Item value={year.value.toString()} onSelect={(currentValue) => { yearValue = parseInt(currentValue); closeAndFocusTriggerYear(ids.trigger); }} class="text-white aria-selected:bg-slate-900 aria-selected:text-white">
              <Check class={cn('mr-2 h-4 w-4', yearValue !== year.value && 'text-transparent')} />
              {year.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>

  <!-- Achievement details -->
  <Label for="achievements">Achievement Title</Label>
  <Input name="achievements" placeholder="achievement" bind:value={achievements} class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0" required />

  <Label for="proof">Link to proof</Label>
  <Input name="proof" placeholder="Proof" bind:value={proof} class="border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0" required />

  <Button class="col-span-2 mt-2" on:click={addAchievement}>Add Student Achievements</Button>
</div>

<!-- Database -->
<div class="mt-4 flex flex-col gap-2">
  <div class="flex justify-end gap-2">
    <Input name="searchInput" placeholder="Search an achievement" bind:value={searchQuery} class="w-1/2 border-0 bg-slate-700 ring-0 focus:ring-primary focus-visible:ring-offset-0" />
    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        <span class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground" use:builder.action {...builder}>
          <Button on:click={getAchievements}>
            <RefreshCcw class="h-6 w-6 cursor-pointer" />
          </Button>
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content side="right">Refresh the database</Tooltip.Content>
    </Tooltip.Root>
  </div>
  {#if studentAchievements.length > 0}
    <div class="grid grid-cols-7 items-center gap-2 min-w-screen rounded-lg bg-slate-800 p-4">
      <p class="col-span-2">Name</p>
      <p class="col-span-1">Branch</p>
      <p class="col-span-1">Year</p>
      <p class="col-span-2">Achievement</p> 
      <p class="col-span-1">Proof</p>
      {#each studentAchievements as achievement (achievement)}
        {#if searchQuery === undefined || achievement.achievements.toLowerCase().includes(searchQuery.toLowerCase()) || achievement.student_name.toLowerCase().includes(searchQuery.toLowerCase())}
          <p class="col-span-2">{achievement.student_name}</p>
          <p class="col-span-1">{achievement.branch}</p>
          <p class="col-span-1">{achievement.year}</p>
          <p class="col-span-2 break-words">{achievement.achievements}</p>
          <Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<span
								class="flex cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary-foreground"
								use:builder.action
								{...builder}
							>
										<a href={achievement.proof} target="_blank">
                      <ExternalLink class="h-4 w-4 rounded-md text-white" />
                    </a>
							</span>
						</Tooltip.Trigger>
						<Tooltip.Content side="right">Go to the proof of the image</Tooltip.Content>
					</Tooltip.Root>
        {/if}
      {/each}
    </div>
  {/if}
</div>