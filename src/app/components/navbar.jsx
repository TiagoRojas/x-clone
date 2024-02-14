import {IconBell, IconBookmark, IconBrandX, IconDotsCircleHorizontal, IconHome, IconMail, IconSearch, IconUser} from '@tabler/icons-react';
import AuthButtonServer from './auth-button';
import NavbarItems from './navbar-items';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {getTranslations} from 'next-intl/server';
import NavbarClient from './navbar-client';

export default async function Navbar() {
	const t = await getTranslations();
	const supabase = createServerComponentClient({cookies});
	const {data} = await supabase.auth.getSession();
	const {data: fetchedUser} = await supabase.from('users').select('*').eq('id', data.session.user.id);
	const userInfo = fetchedUser[0];
	const {user_handle, username} = userInfo;
	const iconClass = 'w-9 h-9 lg:mr-3';
	const navItemList = [
		{title: '', url: '/', element: <IconBrandX className="w-10 h-10" />},
		{title: t('home'), url: '/', element: <IconHome className={iconClass} />},
		{title: t('explore'), url: '/explore', element: <IconSearch className={iconClass} />},
		{title: t('notifications'), url: '/notifications', element: <IconBell className={iconClass} />},
		{title: t('messages'), url: '/messages', element: <IconMail className={iconClass} />},
		{title: t('bookmarks'), url: '/bookmarks', element: <IconBookmark className={iconClass} />},
		{title: t('profile'), url: `/${user_handle || ''}`, element: <IconUser className={iconClass} />, username},
		{title: t('options'), url: '/options', element: <IconDotsCircleHorizontal className={iconClass} />}
	];

	return (
		<header className="relative  hidden md:flex justify-end">
			<div className="fixed top-0 h-full min-w-[72px] w-auto lg:w-[595px] flex lg:items-end flex-col">
				<nav className="align-end lg:mr-8">
					<NavbarItems items={navItemList} userhandle={user_handle} />
				</nav>
				{user_handle ? <NavbarClient user={userInfo} /> : <AuthButtonServer />}
			</div>
		</header>
	);
}
