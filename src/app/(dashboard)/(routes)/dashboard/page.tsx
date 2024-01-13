import { UserButton } from '@clerk/nextjs';

const DashboardPage = () => {
	return (
		<div>
			DashboardPage (protected)
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default DashboardPage;
