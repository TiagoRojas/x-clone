import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import PostsClient from './posts-client';
import {getLocale, getTranslations} from 'next-intl/server';

export default async function Posts() {
	const cookiesStore = cookies();
	const locale = await getLocale();
	const supabase = createServerComponentClient({cookies});
	const {data: userInfo} = await supabase.auth.getUser();
	const {data: posts} = await supabase.rpc('get_posts_for_users', {userid: userInfo.user.id}).order('reposted_at', {ascending: false}).limit(10);

	const hasTheme = cookiesStore.has('theme');
	const t = await getTranslations();
	return (
		<PostsClient posts={posts} userInfo={userInfo} hasTheme={hasTheme} repostedByMe={t('repostedByMe')} repostedByUser={t('repostedByUser')} locale={locale} />
	);
}
