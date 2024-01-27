'use client';

import { cn } from '@/lib/utils';
import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	MusicIcon,
	Settings,
	VideoIcon,
} from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FreeCounter } from './FreeCounter';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
	{
		label: 'Painel',
		icon: LayoutDashboard,
		href: '/dashboard',
		color: 'text-sky-500',
	},
	{
		label: 'Conversação',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-violet-500',
	},
	{
		label: 'Geração de Imagens',
		icon: ImageIcon,
		href: '/image',
		color: 'text-pink-500',
	},
	{
		label: 'Geração de Vídeos',
		icon: VideoIcon,
		href: '/video',
		color: 'text-orange-500',
	},
	{
		label: 'Geração de Música',
		icon: MusicIcon,
		href: '/music',
		color: 'text-emerald-500',
	},
	{
		label: 'Geração de Código',
		icon: Code,
		href: '/code',
		color: 'text-green-500',
	},
	{
		label: 'Configurações',
		icon: Settings,
		href: '/settings',
	},
];

interface SideBarProps {
	apiLimitCount: number;
}

export const SideBar = ({ apiLimitCount = 0 }: SideBarProps) => {
	const pathname = usePathname();

	return (
		<>
			<div className="space-y-4 flex py-4 flex-col h-full bg-card text-foreground">
				<div className="px-3 py-2 flex-1">
					<Link href="/dashboard" className="flex items-center pl-3 mb-14">
						<div className="relative w-8 h-8 mr-4">
							<Image fill alt="logo" src="/logo.png" sizes="full" />
						</div>
						<h1 className={cn('text-2xl font-bold', montserrat.className)}>
							Caibral
						</h1>
					</Link>
					<div className="space-y-1">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={cn(
									'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-secondary rounded-lg transition',
									pathname === route.href
										? 'text-foreground bg-secondary'
										: 'text-muted-foreground'
								)}
							>
								<div className="flex items-center flex-1">
									<route.icon className={cn('h-5 w-5 mr-3', route.color)} />
									{route.label}
								</div>
							</Link>
						))}
					</div>
				</div>
				<FreeCounter apiLimitCount={apiLimitCount} />
			</div>
		</>
	);
};
