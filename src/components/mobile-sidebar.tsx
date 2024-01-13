'use client';

import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { SideBar } from './SideBar';
import { useState, useEffect } from 'react';

const MobileSidebar = () => {
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
				<SideBar />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
