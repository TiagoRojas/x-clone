'use client';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useRouter} from '@/navigation';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import revalidateHome from '../[locale]/actions';

export default function ClientPostForm({placeholder, userInfo, submit}) {
	const userImage = userInfo?.user?.user_metadata.avatar_url;
	const router = useRouter();
	const supabase = createClientComponentClient();
	const form = useForm();
	async function onSubmit(e) {
		if (!userInfo) return;
		const content = e.content;
		const {error} = await supabase.from('posts').insert({content, user_id: userInfo.user.id});
		if (!error) revalidateHome();
	}

	const ref = useRef(null);
	const handleInput = (e) => {
		if (ref.current) {
			ref.current.style.height = 'auto';
			ref.current.style.height = `${e.target.scrollHeight}px`;
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="px-4 flex flex-col border-b">
				<FormField
					control={form.control}
					name="content"
					render={({field}) => (
						<FormItem className="flex">
							<FormLabel>
								{userInfo && (
									<Avatar>
										<AvatarImage src={userImage} />
									</Avatar>
								)}
							</FormLabel>
							<FormControl>
								<textarea
									{...field}
									ref={ref}
									rows={1}
									maxLength={700}
									minLength={1}
									placeholder={placeholder}
									onInput={handleInput}
									className="text-xl resize-none max-h-[900px] min-h-[100px] w-full dark:bg-black ml-2 pb-4 active:border-b border-b focus:outline-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="my-4 self-end rounded-full">
					{submit}
				</Button>
			</form>
		</Form>
	);
}
