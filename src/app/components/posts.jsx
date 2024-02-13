import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import PostsClient from './posts-client';
import {getTranslations} from 'next-intl/server';

export default async function Posts() {
	const cookiesStore = cookies();
	const supabase = createServerComponentClient({cookies});
	const {data: userInfo} = await supabase.auth.getUser();
	const {data: posts} = userInfo?.user?.id
		? await supabase.rpc('get_posts_for_users', {userid: userInfo.user.id}).order('reposted_at', {ascending: false}).limit(10)
		: await supabase.rpc('get_posts').order('created_at', {ascending: false}).limit(10);
	const hasTheme = cookiesStore.has('theme');
	const t = await getTranslations();
	return <PostsClient posts={posts} userInfo={userInfo} hasTheme={hasTheme} repostedByMe={t('repostedByMe')} repostedByUser={t('repostedByUser')} />;
}
