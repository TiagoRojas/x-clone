import createMiddleware from 'next-intl/middleware';
import {localePrefix, locales} from './navigation';
import {NextResponse} from 'next/server';
export default createMiddleware({
	locales,
	localePrefix,
	defaultLocale: 'en'
});

export async function Middleware({req}) {
	const requestHeaders = new Headers(req.headers);
	requestHeaders.set('x-url', req.nextUrl.url);
	requestHeaders.set('x-url2', req.url);
	requestHeaders.set('x-pathname', request.nextUrl.pathname);

	return NextResponse.next({
		request: {
			headers: requestHeaders
		}
	});
}
// only applies this middleware to files in the app directory
export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)']
};
