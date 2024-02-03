import Chat from '@/components/Chat';
import NavBar from '@/components/NavBar';
import Providers from '@/components/Providers';
import { SideBar } from '@/components/SideBar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();
	return (
		<div className="h-full relative">
			<Providers>
				<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
					<SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
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
