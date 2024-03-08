'use client';
import {Button} from '@/components/ui/button';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {IconBookmark, IconHeart, IconRepeat, IconUpload, IconMessageCircle} from '@tabler/icons-react';
import {useState} from 'react';

export default function Buttons({postInfo, userInfo, repostedByMe, i, parentIndex}) {
	const id = userInfo?.user?.id || null;
	const supabase = createClientComponentClient();

	const [likesCount, setLikesCount] = useState(postInfo.likes_count);

	const [repostCount, setRepostCount] = useState(postInfo.repost_count);

	const updateDb = async (db) => {
		if (id == null) {
			window.alert('no iniciaste sesion');
			return;
		}
		const {data} = await supabase.from(db).select('*').eq('post_id', postInfo.id);
		const isAlreadyOnDB = data.find((item) => item.user_id == id);

		if (isAlreadyOnDB) {
			const {error} = await supabase.from(db).delete().eq('post_id', postInfo.id).eq('user_id', id);
			if (!error) {
				switch (db) {
					case 'likes':
						const repostBtn = document.getElementById(`repostsBtn${parentIndex}`);
						repostBtn.classList.add('text-green-600');
					case 'reposts':
						if (repostedByMe) {
							const repost = document.getElementById(postInfo.id);
							const parentReposts = document.getElementById(`reposts${parentIndex}`);
							const parentRepostsBtn = document.getElementById(`repostsBtn${parentIndex}`);
							const totalReposts = parseInt(parentReposts.textContent);
							if (totalReposts - 1 == 0) parentReposts.innerHTML = '';
							else parentReposts.innerHTML = totalReposts - 1;
							parentRepostsBtn.classList.remove('text-green-600');
							repost.remove();
						}
				}
			}
		} else {
			const {error} = await supabase.from(db).insert({user_id: id, post_id: postInfo.id}).eq('post_id', postInfo.id);
			if (!error) {
				switch (db) {
					case 'likes':
						setLikesCount((prev) => prev + 1);
					case 'reposts':
				}
			}
		}
	};

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
				id={`repostsBtn${i}`}
			>
				<IconRepeat />
				<span className="group" id={`reposts${i}`}>
					{repostCount > 0 && repostCount}
				</span>
			</Button>
			<Button variant="faded" className="px-2 group-hover:bg-red-400/20 hover:text-red-600 rounded-full" onClick={(e) => updateDb('likes')}>
				<IconHeart />
				<span id={`likes${i}`}>{likesCount > 0 && likesCount}</span>
			</Button>
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
