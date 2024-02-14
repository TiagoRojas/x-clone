import createMiddleware from 'next-intl/middleware';
import {localePrefix, locales} from './navigation';
import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server';

export default async function middleware(req) {
	const handleI18nRouting = createMiddleware({
		locales,
		localePrefix,
		defaultLocale: 'en'
	});
	const res = handleI18nRouting(req);
	const supabase = createMiddlewareClient({req, res});
	const {data} = await supabase.auth.getSession();
	if (data.session) {
		NextResponse.redirect(new URL('login', 'http://localhost:3000/'));
	}
	return res;
}

export const config = {
	matcher: ['/((?!_next|.*\\..*).*)']
};
