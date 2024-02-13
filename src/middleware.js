import createMiddleware from 'next-intl/middleware';
import {localePrefix, locales} from './navigation';
import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';

export default async function middleware(req) {
	const handleI18nRouting = createMiddleware({
		locales,
		localePrefix,
		defaultLocale: 'en'
	});
	const res = handleI18nRouting(req);

	const supabase = createMiddlewareClient({req, res});
	await supabase.auth.getSession();

	return res;
}

export const config = {
	matcher: ['/((?!_next|.*\\..*).*)']
};
