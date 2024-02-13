'use client';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useRouter} from 'next/navigation';
import {SelectLogin} from './select-login';

export default function AuthButton({session, children, messages}) {
	const supabase = createClientComponentClient();
	const router = useRouter();

	const getURL = () => {
		let url =
			process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
			process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
			'http://localhost:3000/auth/callback';
		// Make sure to include `https://` when not localhost.
		url = url.includes('http') ? url : `https://${url}`;
		// Make sure to include a trailing `/`.
		url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
		return url;
	};

	const handleSignInWithGithub = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: getURL()
			}
		});
	};
	const handleSignInWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getURL()
			}
		});
	};
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return session == null ? (
		<SelectLogin handleSignInWithGithub={handleSignInWithGithub} handleSignInWithGoogle={handleSignInWithGoogle} messages={messages} />
	) : (
		<button onClick={handleSignOut} className="mt-auto mb-2">
			{children}
		</button>
	);
}
