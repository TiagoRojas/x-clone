import {IconBell, IconBookmark, IconBrandX, IconDotsCircleHorizontal, IconHome, IconMail, IconSearch, IconUser} from '@tabler/icons-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {useTranslations} from 'next-intl';
import AuthButtonServer from './auth-button';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import NavbarClient from './navbar-client';

export default function Navbar({user}) {
	const {user_handle, username, avatar_url} = user;
	const t = useTranslations();
	const iconClass = 'w-9 h-9 lg:mr-3';
	const navItemList = [
		{title: '', url: '/', element: <IconBrandX className="w-10 h-10" />},
		{title: t('home'), url: '/', element: <IconHome className={iconClass} />},
		{title: t('explore'), url: '/explore', element: <IconSearch className={iconClass} />},
		{title: t('notifications'), url: '/notifications', element: <IconBell className={iconClass} />},
		{title: t('messages'), url: '/messages', element: <IconMail className={iconClass} />},
		{title: t('bookmarks'), url: '/bookmarks', element: <IconBookmark className={iconClass} />},
		{title: t('profile'), url: `/${user_handle || ''}`, element: <IconUser className={iconClass} />},
		{title: t('options'), url: '/options', element: <IconDotsCircleHorizontal className={iconClass} />}
	];

	return (
		<header className="fixed top-0 h-full min-w-[72px] w-auto lg:w-[595px] flex lg:items-end flex-col">
			<nav className="align-end lg:mr-8">
				<NavbarClient items={navItemList} userhandle={user_handle} />
			</nav>
			{user_handle ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="flex items-center lg:w-[250px] mt-auto mb-4 mr-2 lg:p-[12px] p-[4px] light:hover:bg-gray-300 rounded-full duration-50 transition hover:bg-white/10">
							<Avatar>
								<AvatarImage src={avatar_url} alt={`@${username}`} />
							</Avatar>
							<span className="place-self-end lg:flex flex-col ml-2 hidden">
								{username}
								<i className="not-italic text-xs">@{user_handle}</i>
							</span>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>
							<AuthButtonServer>{`${t('closeSession')} @${user_handle}`}</AuthButtonServer>
						</DropdownMenuLabel>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<AuthButtonServer />
			)}
		</header>
	);
}
