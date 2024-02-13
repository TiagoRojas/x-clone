import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import AuthButton from './auth-button-client';
import {useTranslations} from 'next-intl';

export default async function AuthButtonServer({children}) {
	const supabase = createServerComponentClient({cookies});
	const t = useTranslations();
	const {
		data: {session}
	} = await supabase.auth.getSession();
	const messages = {
		loginBtn: t('loginBtn'),
		signInWithGithub: t('signInWithGithub'),
		signInWithGoogle: t('signInWithGoogle')
	};

	return (
		<AuthButton session={session} messages={messages}>
			{children}
		</AuthButton>
	);
}
