'use client';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { SideBar } from './SideBar';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface MobileSidebarProps {
	apiLimitCount: number;
}

const MobileSidebar = ({ apiLimitCount }: MobileSidebarProps) => {
	const [isMounted, setIsmounted] = useState(false);

	useEffect(() => {
		setIsmounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Sheet>
			<SheetTrigger>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0">
				<SideBar apiLimitCount={apiLimitCount} />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
