import Chat from '@/components/Chat';
import NavBar from '@/components/NavBar';
import Providers from '@/components/Providers';
import { SideBar } from '@/components/SideBar';
import { getApiLimitCount } from '@/lib/api-limit';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const apiLimitCount = await getApiLimitCount();

	return (
		<div className="h-full relative">
			<Providers>
				<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] ">
					<SideBar apiLimitCount={apiLimitCount} />
				</div>
				<main className="md:pl-72 pb-10">
					<NavBar />
					<Chat />

					{children}
				</main>
			</Providers>
		</div>
	);
};

export default DashboardLayout;
