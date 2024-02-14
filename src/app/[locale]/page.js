import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import NewUserPost from '../components/new-user-post';
import Posts from '../components/posts';
import {cookies} from 'next/headers';
import {redirect} from '@/navigation';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata() {
	const t = await getTranslations();
	return {
		title: `${t('home')} / X`
	};
}
export default async function Home() {
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getSession();
	if (!data.session) redirect('/login');
	return (
		<main className="">
			<article className="border-x lg:w-[600px] w-full min-h-full">
				<NewUserPost />
				<Posts />
			</article>
		</main>
	);
}
