'use client';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export function SelectLogin({handleSignInWithGithub, handleSignInWithGoogle, messages}) {
	return (
		<div className="flex flex-col h-20 justify-around">
			<button onClick={handleSignInWithGithub}>
				<span className="py-2 px-4 my-4 rounded-full hover:bg-white/5">{messages.signInWithGithub}</span>
			</button>
			<button onClick={handleSignInWithGoogle}>
				<span className="py-2 px-4 my-4 rounded-full hover:bg-white/5">{messages.signInWithGoogle}</span>
			</button>
		</div>
	);
}
