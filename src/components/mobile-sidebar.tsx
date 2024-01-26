'use client';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { SideBar } from './SideBar';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

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
			<SheetTrigger className="md:hidden">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0">
				<SideBar />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
