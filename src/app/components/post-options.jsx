import {deletePost} from '@/actions';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

export function PostOptions({extraclass, post, userid, translations}) {
	const deletePostById = async (e) => {
		e.stopPropagation();
		const postNode = document.getElementById(post.id);
		const res = await deletePost(post.id);
		if (res.status === 204) {
			postNode.remove();
			if (post.reposted_by_me) {
				const repostedNode = document.getElementById(post.id);
				repostedNode.remove();
			}
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className={extraclass}>
					Open
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<div id={`${post.id} options`}>
					<DropdownMenuGroup>
						{userid === post.user_id && (
							<>
								<DropdownMenuItem>
									<span onClick={(e) => deletePostById(e)}>{translations.delete}</span>
								</DropdownMenuItem>
								<DropdownMenuItem>{translations.edit}</DropdownMenuItem>
								<DropdownMenuItem>{translations.pin}</DropdownMenuItem>
							</>
						)}
						{userid !== post.user_id && (
							<>
								<DropdownMenuItem>Block</DropdownMenuItem>
								<DropdownMenuItem>unfollow @{post.user.username}</DropdownMenuItem>
							</>
						)}
					</DropdownMenuGroup>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
