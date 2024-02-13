import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {redirect, useRouter} from 'next/navigation';

export async function GET(req) {
	const requestUrl = new URL(req.url);
	const code = requestUrl.searchParams.get('code');
	const router = useRouter();
	if (code !== null) {
		const supabase = createRouteHandlerClient({cookies});
		await supabase.auth.exchangeCodeForSession(code);
		router.push(requestUrl.origin);
	}

	// return redirect(requestUrl.origin);
}
