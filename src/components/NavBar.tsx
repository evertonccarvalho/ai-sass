import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from './ModeToggle';
import { getApiLimitCount } from '@/lib/api-limit';

const NavBar = async () => {
	const apiLimitCount = await getApiLimitCount();
	return (
		<div className="flex items-center p-4">
			<MobileSidebar apiLimitCount={apiLimitCount} />
			<div className="flex w-full justify-end">
				<UserButton afterSignOutUrl="/" />
				<ModeToggle />
			</div>
		</div>
	);
};

export default NavBar;
