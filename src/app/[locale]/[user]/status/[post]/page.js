import Post from '@/app/components/post';
import {useTranslations} from 'next-intl';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {getTranslations} from 'next-intl/server';

export function generateMetadata({params}) {
	const supabase = createClientComponentClient();
	const data = async () => {
		const {data: res} = await supabase.from('posts').select('*, user:users(username)').eq('id', params.post);
		const post = res[0];
		const t = await getTranslations();
		return {
			title: `${post.user.username} ${t('onX')}: "${post.content}" / X`
		};
	};
	return data();
}

export default function page({params}) {
	const t = useTranslations();
	return (
		<>
			<Post params={params} translated={t('onX')} />
		</>
	);
}
