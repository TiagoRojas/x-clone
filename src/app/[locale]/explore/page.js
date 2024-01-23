import Posts from '@/app/components/posts';
import {headers} from 'next/headers';
import {useRouter} from 'next/navigation';
import React from 'react';

export default function page() {
	return (
		<div>
			<Posts></Posts>
		</div>
	);
}
