'use client';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useRouter} from 'next/navigation';
import React from 'react';

export default function AuthButton({session, children}) {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		});
	};
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return session === null ? (
		<button onClick={handleSignIn} className="mt-auto mb-2">
			Iniciar Sesion
		</button>
	) : (
		<button onClick={handleSignOut} className="mt-auto mb-2">
			{children}
		</button>
	);
}
