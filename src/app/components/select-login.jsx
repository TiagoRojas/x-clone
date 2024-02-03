'use client';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useTranslations} from 'next-intl';

export function SelectLogin({handleSignInWithGithub, handleSignInWithGoogle}) {
	const t = useTranslations();
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="mt-auto mb-4">
					{t('loginBtn')}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="flex flex-col h-20 justify-around">
					<button onClick={handleSignInWithGithub}>
						<span className="py-2 px-4 my-4 rounded-full hover:bg-white/5">{t('signInWithGithub')}</span>
					</button>
					<button onClick={handleSignInWithGoogle}>
						<span className="py-2 px-4 my-4 rounded-full hover:bg-white/5">{t('signInWithGoogle')}</span>
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
