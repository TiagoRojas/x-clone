'use server';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export default async function revalidateHome() {
	revalidatePath('/');
}

export async function getPosts({skip, userid}) {
	const supabase = createServerComponentClient({cookies});
	const {data: posts} = await supabase.rpc('get_posts_for_users', {userid, skip}).order('reposted_at', {ascending: false}).limit(10);
	return posts;
}

export async function deletePost(id) {
	const supabase = createServerComponentClient({cookies});
	const res = await supabase.from('posts').delete().eq('id', id);
	return res;
}
