import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_ID, ADMIN_PASSWORD } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	console.log(event.url.pathname);
	if (event.url.pathname.startsWith('/admin/')) {
		if (cookies.get(ADMIN_ID) !== ADMIN_PASSWORD) {
			console.log(cookies.get(ADMIN_ID));
			console.log(ADMIN_PASSWORD, ADMIN_ID);
			console.log('can not enter');
			throw redirect(302, '/');
		}
	}

	const response = await resolve(event);
	return response;
};
