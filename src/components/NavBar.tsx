import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from './ModeToggle';

const NavBar = () => {
	return (
		<div className="flex items-center p-4">
			<MobileSidebar />
			<div className="flex w-full justify-end">
				<UserButton afterSignOutUrl="/" />
				<ModeToggle />
			</div>
		</div>
	);
};

export default NavBar;
