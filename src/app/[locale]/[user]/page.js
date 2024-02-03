import PostsClient from '@/app/components/posts-client';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {getTranslations} from 'next-intl/server';
import {cookies} from 'next/headers';
import Image from 'next/image';
import {redirect} from 'next/navigation';

export default async function User({params}) {
	const {user: user_handle} = params;
	if (!user_handle) redirect('/');
	const cookiesStore = cookies();
	const supabase = createServerComponentClient({cookies});
	const {data, error} = await supabase.from('users').select('*').eq('user_handle', user_handle);
	const user = data[0];
	const t = await getTranslations();
	const hasTheme = cookiesStore.has('theme');

	// const {error: test} = await supabase.functions.invoke('order_posts_and_repost');
	const {data: posts, error: errortest} = await supabase.rpc('get_posts_for_user').eq('user_id', user.id).order('reposted_at', {ascending: false});
	return (
		<div className="">
			<section>
				<div className="">
					<Image src={user.banner_url || '/default-banner.jpg'} width="0" height="0" sizes="100vw" className="" />
					<div className="relative -top-10 left-4">
						<Avatar className="w-24 h-24 border-4 border-neutral-950">
							<AvatarImage src={user.avatar_url} />
						</Avatar>
					</div>
				</div>
				<h2>{user.username}</h2>
			</section>
			<section>
				<PostsClient posts={posts} hasTheme={hasTheme} userInfo={user} repostedByMe={t('reposted-by-me')} repostedByUser={t('reposted-by-user')} />
			</section>
		</div>
	);
}
