'use client';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import moment from 'moment';
import Buttons from './posts-buttons';
import {useRouter} from '@/navigation';
import {setThemeCookie} from '@/lib/theme';
import {useEffect} from 'react';
import {IconRepeat} from '@tabler/icons-react';

export default function PostsClient({posts, userInfo, hasTheme, repostedByMe, repostedByUser}) {
	const router = useRouter();
	const pushToPost = (e, id, author_handle) => {
		const tagName = e.target.tagName;
		if (tagName == 'svg' || tagName == 'BUTTON' || tagName == 'path') return;
		if (!id || !author_handle) return;
		router.push(`/${author_handle}/status/${id}`);
	};
	// This useEffect set the preferred theme, with window.matchMedia consult if user prefers dark scheme and then if the cookie doesn't exists, adds it.
	useEffect(() => {
		if (!window) return;
		if (!hasTheme) {
			const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setThemeCookie(preferredTheme);
		}
	}, []);
	const pushToUser = (e, userhandle) => {
		e.stopPropagation();
		router.push(`/${userhandle}`);
	};
	// return <pre>{JSON.stringify(posts)}</pre>;
	return posts.map((post, i) => {
		return (
			<article
				className="lg:w-[600px] w-full flex flex-col border-b p-3 hover:cursor-pointer"
				key={`${post.id} ${i}`}
				onClick={(e) => pushToPost(e, post.id, post.user.user_handle)}
			>
				{post.is_reposted ? (
					post.user_id === userInfo.id ? (
						<div className="flex items-center text-gray-100/60 text-sm ml-3 w-auto">
							<IconRepeat className="w-5" />
							<span className="ml-3">{repostedByMe}</span>
						</div>
					) : (
						<div className="flex items-center text-gray-100/60 text-sm ml-3 w-auto">
							<IconRepeat className="w-5" />
							<span className="ml-3">{`${post.reposted_by} ${repostedByUser}.`}</span>
						</div>
					)
				) : null}
				<div className="flex w-full">
					<div onClick={(e) => pushToUser(e, post.user.user_handle)} className="flex w-auto h-max">
						<Avatar>
							<AvatarImage src={post.user.avatar_url} alt={`@${post.user.user_handle}`} />
						</Avatar>
					</div>
					<div className="flex flex-col">
						<div className="ml-1">
							<div>
								<span className="text-lg hover:underline transition" onClick={(e) => pushToUser(e, post.user.user_handle)}>
									{post.user.username}
								</span>
								<span className="text-md mx-1 text-gray-400">@{post.user.user_handle}</span>
								<span className="text-md text-gray-400">
									<i className="mr-1">&bull;</i>
									{moment(post.created_at).fromNow()}
								</span>
							</div>
							<p className="flex w-full items-center gap-4 max-h-[215px] max-w-[515px]">{post.content}</p>
						</div>
						<Buttons postInfo={post} userInfo={userInfo} repostedByMe={post.reposted_by_me} />
					</div>
				</div>
			</article>
		);
	});
}
