'use client';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useRouter} from 'next/navigation';
import React from 'react';
import {SelectLogin} from './select-login';

export default function AuthButton({session, children}) {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const handleSignInWithGithub = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		});
	};
	const handleSignInWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		});
	};
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return session == null ? (
		<SelectLogin handleSignInWithGithub={handleSignInWithGithub} handleSignInWithGoogle={handleSignInWithGoogle} />
	) : (
		<button onClick={handleSignOut} className="mt-auto mb-2">
			Cerrar sesion
		</button>
	);
}
