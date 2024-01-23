'use server';

import {cookies} from 'next/headers';

export async function setThemeCookie(theme) {
	const cookiesStore = cookies();
	if (theme) {
		cookiesStore.set({
			name: 'theme',
			value: 'dark',
			maxAge: 60 * 60 * 24 * 365
		});
	}
	if (!theme) {
		cookiesStore.set({
			name: 'theme',
			value: 'light'
		});
	}
}

export async function setUserTheme(theme) {
	const cookiesStore = cookies();
	if (theme == 'dark') {
		cookiesStore.set({
			name: 'theme',
			value: 'dark'
		});
	}
	if (theme == 'light') {
		cookiesStore.set({
			name: 'theme',
			value: 'light'
		});
	}
}

export async function getTheme() {
	const cookiesStore = cookies();
	const theme = cookiesStore.get('preferredTheme')?.value || 'dark';
	return theme;
}
