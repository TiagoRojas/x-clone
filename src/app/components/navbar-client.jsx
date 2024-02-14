import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import AuthButtonServer from './auth-button';
import {useTranslations} from 'next-intl';
export default function NavbarClient({user}) {
	const {user_handle, username, avatar_url} = user;
	const t = useTranslations();
	return (
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
	);
}
