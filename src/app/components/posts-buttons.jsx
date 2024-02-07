'use client';
import {Button} from '@/components/ui/button';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {IconBookmark, IconHeart, IconRepeat, IconUpload, IconMessageCircle} from '@tabler/icons-react';

export default function Buttons({postInfo, userInfo, repostedByMe}) {
	const id = userInfo?.user?.id || null;
	const supabase = createClientComponentClient();

	const updateDb = async (db) => {
		console.log(userInfo);
		if (id == null) {
			console.log('not logged');
			return;
		}
		const {data} = await supabase.from(db).select('*').eq('post_id', postInfo.id);
		const isAlreadyOnDB = data.find((item) => item.user_id == id);
		console.log(isAlreadyOnDB);
		if (isAlreadyOnDB) {
			await supabase.from(db).delete().eq('post_id', postInfo.id).eq('user_id', id);
		} else {
			const a = await supabase.from(db).insert({user_id: id, post_id: postInfo.id}).eq('post_id', postInfo.id);
			console.log(a);
		}
	};
	console.log(postInfo);
	return (
		<div className="flex justify-between w-full">
			<Button variant="faded" className="group-hover:bg-blue-400/20 hover:text-blue-600 p-2 rounded-full" onClick={() => null}>
				<IconMessageCircle />
				{/* <span>{postInfo.replies.length > 0 && postInfo.replies.length}</span> */}
			</Button>
			<Button
				variant="faded"
				className={`${repostedByMe ? `group-hover:bg-green-400/20 text-green-600` : `group-hover:bg-green-400/20 hover:text-green-600`} p-2 rounded-full`}
				onClick={() => updateDb('reposts')}
			>
				<IconRepeat />
				<span className="group">{postInfo.repost_count > 0 && postInfo.repost_count}</span>
			</Button>
			<Button variant="faded" className="px-2 group-hover:bg-red-400/20 hover:text-red-600 rounded-full" onClick={() => updateDb('likes')}>
				<IconHeart />
			</Button>
			{/* <span>{postInfo.likes.length > 0 && postInfo.likes.length}</span> */}
			<section>
				<Button variant="faded" className="group-hover:bg-blue-400/20 rounded-full place-self-end p-2" onClick={() => updateDb('likes')}>
					<IconBookmark />
				</Button>
				<Button variant="faded" className="hover:bg-blue-400/20 rounded-full place-self-end p-2">
					<IconUpload />
				</Button>
			</section>
		</div>
	);
}
