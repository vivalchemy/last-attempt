// import supabase from "$lib/supabase/config";
// import { fail, redirect } from '@sveltejs/kit';
// import type { Action, Actions } from './$types';
// import { z } from 'zod';

// const getUser = async (username: string) => {
// 	const data = await supabase.from("teachers").select('*').eq('username', username);
// 	// alert(error?.message);
// 	if (data.data) {
// 		console.log(data.data[0]);
// 		return data.data[0];
// 	}
// };



// const schema = z.object({
// 	username: z.string(),
// 	password: z.string()
// });

// const login: Action = async ({ cookies, request }) => {
// 	console.log('logging in');
// 	const data = await request.formData();
// 	console.log(data);
// 	const username = data.get('username');
// 	const password = data.get('password');

// 	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
// 		return fail(400, { invalid: true });
// 	}
// 	const fetchedUser = await getUser(username);

// 	if (password === fetchedUser.password) {
// 		cookies.set('username', username, {
// 			// send cookie for every page
// 			path: '/',
// 			// server side only cookie so you can't use `document.cookie`
// 			httpOnly: true,
// 			// only requests from same site can send cookies
// 			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
// 			sameSite: 'strict',
// 			// only sent over HTTPS in production
// 			secure: process.env.NODE_ENV === 'production',
// 			maxAge: 60 * 60 * 24 * 365 // 1 year
// 		});
// 		cookies.set('password', password, {
// 			// send cookie for every page
// 			path: '/',
// 			// server side only cookie so you can't use `document.cookie`
// 			httpOnly: true,
// 			// only requests from same site can send cookies
// 			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
// 			sameSite: 'strict',
// 			// only sent over HTTPS in production
// 			secure: process.env.NODE_ENV === 'production',
// 			maxAge: 60 * 60 * 24 * 365 // 1 year
// 		});

// 		console.log('logged in');
// 		// redirect the user
// 		throw redirect(302, '/');
// 	}

// 	console.log('not logged in');
// 	// redirect the user
// 	console.log(email, password, fetchedUser.password);
// };

// export const actions: Actions = { login };


