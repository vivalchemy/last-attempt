import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_ID, ADMIN_PASSWORD } from '$env/static/private';
import  supabase  from './lib/supabase/config';
const getUser = async (username: string) => {
	const data = await supabase.from("teachers").select('*').eq('username', username);
	// alert(error?.message);
	if (data.data) {
		console.log("From hook", data.data[0]);
		return data.data[0];
	}
};
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

  if (event.url.pathname.startsWith('/teacher') && event.url.pathname !== '/teacher') {
    let username = '';
		let password = '';
    if (
			cookies.get('username')
		) {
			username = cookies.get('username');
		}else{
      // console.log(fetchedUser.password, password);
			throw redirect(302, '/teacher');
    }
    if (
			cookies.get('password') ||
			cookies.get('password') !== null ||
			cookies.get('password') !== undefined
		) {
			password = cookies.get('password');
		}
    const fetchedUser = await getUser(username);

    if (
			fetchedUser.password !== password ||
			password === '' ||
			password === null ||
			password === undefined
		) {
      console.log('can not enter');
      // console.log(fetchedUser.password, password);
			throw redirect(302, '/teacher');
		}
  }


	const response = await resolve(event);
	return response;
};
