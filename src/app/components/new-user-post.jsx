import React from 'react';
import {cookies} from 'next/headers';
import {getTranslations} from 'next-intl/server';
import ClientPostForm from './new-user-post-client';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
export default async function NewUserPost() {
	const t = await getTranslations();
	const supabase = createServerComponentClient({cookies});
	const {data: userInfo} = await supabase.auth.getUser();

	return <ClientPostForm placeholder={t('insertPost')} userInfo={userInfo} submit={t('submitBtn')} />;
}
