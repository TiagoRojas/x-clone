'use client';
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useRouter} from '@/navigation';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';

export default function ClientPostForm({placeholder, userInfo, submit}) {
	const userImage = userInfo?.user?.user_metadata.avatar_url;
	const supabase = createClientComponentClient();
	const form = useForm();
	const router = useRouter();

	async function onSubmit(e) {
		if (!userImage) return;
		if (!userInfo) return;
		const content = e.content;
		const {error} = await supabase.from('posts').insert({content, user_id: userInfo.user.id});
		console.log(error);
		if (!error) router.refresh();
	}

	const textareaRef = useRef(null);
	// This function dynamically changes the height of the textarea depending on how much the user wrote.
	const handleInput = (e) => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${e.target.scrollHeight}px`;
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
									ref={textareaRef}
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
