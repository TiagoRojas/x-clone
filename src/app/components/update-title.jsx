'use client';

import {useEffect} from 'react';

export default function UpdateTitle({info}) {
	useEffect(() => {
		console.log(info);
		document.title = `${info.user.username}`;
	}, []);
}
