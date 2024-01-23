import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

import PostsClient from './posts-client';

export default async function Posts() {
	const cookiesStore = cookies();
	const supabase = createServerComponentClient({cookies});
	const {data: userInfo} = await supabase.auth.getUser();
	const {data: posts, error} = await supabase.from('posts').select('*, user:users(username, avatar_url, user_handle)').order('created_at', {ascending: false});
	const hasTheme = cookiesStore.has('theme');
	return <PostsClient posts={posts} userInfo={userInfo} hasTheme={hasTheme} />;
}
