import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export default async function Post({params, translated}) {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.from('posts').select('*, user:users(username)').eq('id', params.post);
	const post = data[0];
	return <div>post</div>;
}
