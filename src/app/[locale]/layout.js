import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import '../globals.css';
import {cookies} from 'next/headers';
import Navbar from '../components/navbar';
import {getTheme} from '@/lib/theme';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {redirect} from 'next/navigation';

export const metadata = {
	title: 'Create Next App',
	description: 'X Clone using NextJS and Supabase'
};

export default async function LocaleLayout({children, params: {locale}}) {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getUser();
	const {data: fetchedUser} = await supabase.from('users').select('*').eq('id', data.user.id);
	const userInfo = fetchedUser[0];
	const theme = await getTheme();
	return (
		<html lang={locale} className={theme}>
			<body>
				<NextIntlClientProvider>
					<main className="min-h-screen min-w-screen grid grid-flow-col grid-cols-3">
						{data.user && (
							<div className="relative  hidden md:flex justify-end">
								<Navbar user={userInfo} />
							</div>
						)}

						{children}
					</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
