import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import '../globals.css';
import {cookies} from 'next/headers';
import Navbar from '../components/navbar';
import {getTheme} from '@/lib/theme';
import {NextIntlClientProvider, useMessages} from 'next-intl';

export const metadata = {
	title: 'Create Next App',
	description: 'X Clone using NextJS and Supabase'
};

export default async function LocaleLayout({children, params: {locale}}) {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getUser();
	const userInfo = {
		user_handle: data?.user?.user_metadata.user_name || data?.user?.user_metadata.full_name,
		username: data?.user?.user_metadata.name || data?.user?.user_metadata.full_name,
		avatar_url: data?.user?.user_metadata.avatar_url
	};
	const theme = await getTheme();

	return (
		<html lang={locale} className={theme}>
			<body>
				<NextIntlClientProvider>
					<main className="min-h-screen min-w-screen grid grid-flow-col grid-cols-3">
						<div className="relative  hidden md:flex justify-end">
							<Navbar user={userInfo} />
						</div>
						{children}
					</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
