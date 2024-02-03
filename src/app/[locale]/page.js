import NewUserPost from '../components/new-user-post';
import Posts from '../components/posts';

export const metadata = {
	title: `Home / X`
};

export default async function Home(params) {
	return (
		<main className="">
			<article className="border-x lg:w-[600px] w-full min-h-full">
				{/* <NewUserPost /> */}
				{/* <Posts params={params} /> */}
			</article>
		</main>
	);
}
