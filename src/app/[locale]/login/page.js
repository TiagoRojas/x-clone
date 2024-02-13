import AuthButton from '@/app/components/auth-button-client';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {getTranslations} from 'next-intl/server';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export default async function page() {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getSession();
	if (data.session) {
		console.log('a');
	} else {
		console.log('b');
	}
	const t = await getTranslations();
	const messages = {
		loginBtn: t('loginBtn'),
		signInWithGithub: t('signInWithGithub'),
		signInWithGoogle: t('signInWithGoogle')
	};
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<AuthButton messages={messages} />
		</div>
	);
}
