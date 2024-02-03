import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import moment from 'moment';
import {cookies} from 'next/headers';

export default async function Post({params, translated}) {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.from('posts').select('*, user:users(username, avatar_url, user_handle)').eq('id', params.post);

	const post = data[0];
	return (
		<article>
			<div>
				<Avatar>
					<AvatarImage src={post.user.avatar_url} />
				</Avatar>
				<h3>{post.user.username}</h3>
				<span>@{post.user.user_handle}</span>
			</div>
			<div>
				<p>{post.content}</p>
				<span>
					{moment(post.created_at).format(`h:mm a.`)} &bull; {moment(post.created_at).format('MMMM Do YYYY')}
				</span>
			</div>
			<section></section>
			<pre>{JSON.stringify(post, null, 2)}</pre>
		</article>
	);
}
