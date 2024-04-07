<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
	// console.log(form)
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<form action="?/login" method="POST" class="mx-auto max-w-sm border-2 p-10 shadow rounded-lg border-white">
    <h2 class="text-3xl font-bold flex justify-center">Login</h2>
		<div class="mb-5">
			<label for="username" class="mb-2 block text-sm font-medium text-white">Username</label>
			<input
				type="username"
				id="username"
        name="username"
				class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm bg-slate-950 focus:border-blue-500 focus:ring-blue-500"
				required
			/>
		</div>
		<div class="mb-5">
			<label for="password" class="mb-2 block text-sm font-medium text-white">Your password</label>
			<input
				type="password"
				id="password"
        name="password"
				class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm bg-slate-950 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				required
			/>
		</div>
		<button
			type="submit"
			class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
			>Submit</button
		>
	</form>
</div>
