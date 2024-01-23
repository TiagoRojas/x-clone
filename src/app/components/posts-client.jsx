'use client';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import moment from 'moment';
import ButtonsClient from './posts-buttons-client';
import {useRouter} from '@/navigation';
import {setThemeCookie} from '@/lib/theme';
import {useEffect} from 'react';

export default function PostsClient({posts, userInfo, hasTheme}) {
	const router = useRouter();
	const pushToPost = (e, id, user_handle) => {
		const tagName = e.target.tagName;
		if (tagName == 'svg' || tagName == 'BUTTON' || tagName == 'path') return;
		if (!id || !user_handle) return;
		router.push(`/${user_handle}/status/${id}`);
	};
	useEffect(() => {
		if (!window) return;
		if (hasTheme) null;
		const test = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setThemeCookie(test);
	}, []);
	return posts.map((post) => {
		console.log(post);
		return (
			<article className="lg:w-[600px] w-full flex border-b p-3" key={post.id} onClick={(e) => pushToPost(e, post.id, post.user.user_handle)}>
				<div href={`/${post.user.user_handle}`} className="flex w-auto h-max">
					<Avatar>
						<AvatarImage src={post.user.avatar_url} alt={`@${post.user.user_handle}`} />
					</Avatar>
				</div>
				<div className="flex flex-col">
					<div className="ml-1">
						<div>
							<span className="text-lg hover:underline transition">{post.user.username}</span>
							<span className="text-md mx-1 text-gray-400">@{post.user?.user_handle}</span>
							<span className="text-md text-gray-400">
								<i className="mr-1">&bull;</i>
								{moment(post.created_at).fromNow()}
							</span>
						</div>
						<p className="flex w-full items-center gap-4 max-h-[215px] max-w-[515px]">{post.content}</p>
					</div>
					<ButtonsClient postInfo={post} userInfo={userInfo} />
				</div>
			</article>
		);
	});
}
