import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import AuthButton from './auth-button-client';

export default async function AuthButtonServer({children}) {
	const supabase = createServerComponentClient({cookies});
	const {
		data: {session}
	} = await supabase.auth.getSession();

	return <AuthButton session={session}>{children}</AuthButton>;
}
