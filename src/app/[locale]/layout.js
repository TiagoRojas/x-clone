import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import '../globals.css';
import {cookies} from 'next/headers';
import Navbar from '../components/navbar';
import {getTheme} from '@/lib/theme';
import {NextIntlClientProvider, useMessages} from 'next-intl';

export async function generateMetadata(props) {
	console.log(props);
	return {
		title: props.title
	};
}

export default async function LocaleLayout({children, params: {locale}}) {
	const theme = await getTheme();
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getSession();
	return (
		<html lang={locale} className={theme}>
			<body>
				<NextIntlClientProvider>
					<main className="min-h-screen min-w-screen grid grid-flow-col grid-cols-3">
						{data.session && <Navbar />}
						{children}
					</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
