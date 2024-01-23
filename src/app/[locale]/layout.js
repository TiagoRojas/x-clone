import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import '../globals.css';
import {cookies} from 'next/headers';
import Navbar from '../components/navbar';
import {getTheme} from '@/lib/theme';
import Head from 'next/head';

export const metadata = {
	title: 'Create Next App',
	description: 'X Clone using NextJS and Supabase'
};

export default async function LocaleLayout({children, params: {locale}}) {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getUser();
	const userInfo = {
		user_handle: data?.user?.user_metadata.user_name,
		username: data?.user?.user_metadata.full_name,
		avatar_url: data?.user?.user_metadata.avatar_url
	};

	const theme = await getTheme();

	return (
		<html lang={locale} className={theme}>
			<body>
				<main className="min-h-screen min-w-screen flex">
					<div className="relative w-[575px] flex justify-end">
						<Navbar user={userInfo} />
					</div>
					{children}
				</main>
			</body>
		</html>
	);
}
