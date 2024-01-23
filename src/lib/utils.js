import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export async function generateMetadata(params) {
	console.log(params);
	return {
		title: '...'
	};
}
