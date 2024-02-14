'use server';
import PostsClient from '@/app/components/posts-client';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import moment from 'moment';
import {getTranslations} from 'next-intl/server';
import {cookies} from 'next/headers';
import Image from 'next/image';
import {redirect} from 'next/navigation';
import 'moment/locale/es';

export async function generateMetadata({params}) {
	return {
		title: `${params.user} / X`
	};
}

export default async function User({params}) {
	const {user: user_handle, locale} = params;
	if (!user_handle) redirect('/');
	const cookiesStore = cookies();
	const supabase = createServerComponentClient({cookies});

	const {data: loggedUser} = await supabase.auth.getUser();
	const {data, error} = await supabase.rpc('get_user', {userhandle: user_handle});
	const user = data[0];

	const t = await getTranslations();

	const hasTheme = cookiesStore.has('theme');
	const {data: posts, error: errorPosts} = await supabase.rpc('get_posts_for_user', {userid: user.id});
	return (
		<div className="border-x w-[600px]">
			<section className="flex-col border-b">
				<div className="h-[200px] flex flex-col justify-end mb-10 bg-gray-400">
					<Image src={user.banner_url || '/default-banner.jpg'} width="0" height="0" sizes="100vw" className="" />
					<div className="relative top-10 left-4">
						<Avatar className="w-32 h-32 border-4 border-neutral-950">
							<AvatarImage src={user.avatar_url} />
						</Avatar>
					</div>
				</div>
				<section className="flex justify-between items-center mx-4 pb-4">
					<div>
						<h2 className="text-2xl">{user.username}</h2>
						<h3 className="text-gray-100/50">@{user.user_handle}</h3>
						<span>
							{`${t('joinedat')} 
							${moment(user.created_at).locale(locale).format('MMMM')} ${t('of')} 
							${moment(user.created_at).locale(locale).format('YYYY')}`}
						</span>
						<div className="flex capitalize cursor-default font-bold text-sm">
							<span className="hover:underline">
								{user.follows} <i className="not-italic text-gray-100/50 font-normal"> {t('follows')}</i>
							</span>
							<span className="ml-4 hover:underline">
								{user.followers} <i className="not-italic text-gray-100/50 font-normal"> {t('followers')}</i>
							</span>
						</div>
					</div>
					<div>{!loggedUser.user ? <span>Follow</span> : <span>{user.id === loggedUser.user.id ? t('editProfile') : 'Follow'}</span>}</div>
				</section>
				<div className="flex justify-between mx-4">
					<h4 className="text-xl cursor-default w-max ml-2 border-sky-500 border-b-4 rounded">{t('posts')}</h4>
					<h4 className="text-xl cursor-default w-max ml-2 text-gray-100/50">{t('responses')}</h4>
					<h4 className="text-xl cursor-default w-max ml-2 text-gray-100/50">{t('media')}</h4>
					<h4 className="text-xl cursor-default w-max ml-2 text-gray-100/50">{t('likes')}</h4>
				</div>
			</section>
			<section>
				{errorPosts ? (
					<pre>{JSON.stringify(errorPosts, null, 2)}</pre>
				) : (
					<PostsClient posts={posts} hasTheme={hasTheme} userInfo={user} repostedByMe={t('repostedByMe')} repostedByUser={t('repostedByUser')} />
				)}
			</section>
		</div>
	);
}
