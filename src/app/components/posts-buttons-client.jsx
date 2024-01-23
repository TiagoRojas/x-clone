'use client';
import {Button} from '@/components/ui/button';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {IconBookmark, IconHeart, IconRepeat, IconUpload, IconMessageCircle} from '@tabler/icons-react';
export default function ButtonsClient({postInfo, userInfo}) {
	const id = userInfo.user?.id || null;
	const supabase = createClientComponentClient();
	const updateLike = async () => {
		if (id == null) {
			console.log('not logged');
			return;
		}
		const {data} = await supabase.from('posts').select('likes').eq('id', postInfo.id);
		const likeList = data[0].likes;
		const isAlreadyLiked = likeList.includes(id);
		if (isAlreadyLiked) {
			const newLikeList = likeList.filter((user) => user !== id);
			await supabase.from('posts').update({likes: newLikeList}).eq('id', postInfo.id);
		} else {
			await supabase
				.from('posts')
				.update({likes: [...postInfo.likes, id]})
				.eq('id', postInfo.id);
		}
	};
	return (
		<div className="flex justify-between w-full">
			<Button variant="faded" className="hover:bg-blue-400/20 rounded-full p-2" onClick={() => null}>
				<IconMessageCircle />
				{postInfo.reposts.length > 0 && postInfo.reposts.length}
			</Button>
			<Button variant="faded" className="hover:bg-green-400/20 rounded-full p-2" onClick={() => null}>
				<IconRepeat />
				{postInfo.reposts.length > 0 && postInfo.reposts.length}
			</Button>
			<Button variant="faded" className="hover:bg-red-400/20 rounded-full p-2" onClick={updateLike}>
				<IconHeart />
				{postInfo.likes.length > 0 && postInfo.likes.length}
			</Button>
			<div>
				<Button variant="faded" className="hover:bg-blue-400/20 rounded-full place-self-end p-2">
					<IconBookmark />
				</Button>
				<Button variant="faded" className="hover:bg-blue-400/20 rounded-full place-self-end p-2">
					<IconUpload />
				</Button>
			</div>
		</div>
	);
}
