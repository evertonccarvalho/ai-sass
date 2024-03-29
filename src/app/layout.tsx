import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/components/modal-provider';
import { ThemeProvider } from '@/components/theme-provider';
import ToasterProvider from '@/components/toaster-provider';
import { CrispProvider } from '@/components/cristp-proveder';
export const metadata: Metadata = {
	title: 'Caibral ',
	description: 'Potencializando Inteligência Artificial',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="pt-br" suppressHydrationWarning>
				<CrispProvider />
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<ModalProvider />
						<ToasterProvider />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
