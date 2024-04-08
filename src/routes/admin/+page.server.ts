import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions } from './$types';
import { ADMIN_ID, ADMIN_PASSWORD } from '$env/static/private';

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return fail(400, { invalid: true });
	}

	if (username === ADMIN_ID && password === ADMIN_PASSWORD) {
		cookies.set(username, password, {
			// send cookie for every page
			path: '/admin/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after an 3 hours
			maxAge: 60 * 60 * 3
		});
		redirect(302, '/admin/dashboard/');
	}

	// redirect the user
	redirect(302, '/admin');
};

export const actions: Actions = { login };
