import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import PostsClient from './posts-client';
import {getLocale, getTranslations} from 'next-intl/server';
import {getPosts} from '@/actions';

export default async function Posts() {
	const cookiesStore = cookies();
	const locale = await getLocale();
	const supabase = createServerComponentClient({cookies});
	const {data: userInfo} = await supabase.auth.getUser();
	const initialPosts = await getPosts({userid: userInfo.user.id});
	const hasTheme = cookiesStore.has('theme');
	const t = await getTranslations();
	const translations = {delete: t('post.delete'), pin: t('post.pin'), edit: t('post.edit')};
	return (
		<div id="posts">
			<PostsClient
				initialPosts={initialPosts}
				userInfo={userInfo}
				hasTheme={hasTheme}
				repostedByMe={t('repostedByMe')}
				repostedByUser={t('repostedByUser')}
				locale={locale}
				translations={translations}
			/>
		</div>
	);
}
