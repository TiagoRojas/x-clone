'use client';
import {Link} from '@/navigation';
import {usePathname} from 'next/navigation';

export default function NavbarClient({items}) {
	const pathname = usePathname();
	const linkClass =
		'flex lg:items-center capitalize lg:w-max text-2xl lg:p-[12px] p-[5px] my-[2px] light:hover:bg-gray-300 hover:bg-white/10 rounded-full duration-50 transition';
	const extraClass = 'lg:pr-[20px]';
	const textClass = 'lg:inline hidden';
	return items.map((item, i) => (
		<Link href={item.url} key={item.title} className={`${linkClass} ${i > 0 && extraClass} ${pathname == item.url && 'font-bold'}`}>
			{item.element}
			<span className={textClass}>{item.title}</span>
		</Link>
	));
}
