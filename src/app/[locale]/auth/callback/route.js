import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export async function GET(req) {
	const requestUrl = new URL(req.url);
	const code = requestUrl.searchParams.get('code');

	if (code !== null) {
		const supabase = createRouteHandlerClient({cookies});
		await supabase.auth.exchangeCodeForSession(code);
	}

	return redirect(requestUrl.origin);
}