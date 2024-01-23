import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'es'];

export default getRequestConfig(async ({locale}) => ({
	messages: (await import(`./messages/${locale}.json`)).default
}));
