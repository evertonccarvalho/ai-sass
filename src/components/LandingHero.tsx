'use client';

import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export const LandingHero = () => {
	const { isSignedIn } = useAuth();

	return (
		<div className="text-foreground font-bold py-28 text-center space-y-5">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
				<h1>O Melhor Ferramenta de IA para</h1>
				<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
					<TypewriterComponent
						options={{
							strings: [
								'Chatbot.',
								'Geração de Fotos.',
								'Escrita de Blog.',
								'Escrita de E-mail.',
							],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="text-sm md:text-xl font-light text-muted-foreground">
				Crie conteúdo usando IA 10x mais rápido.
			</div>
			<div>
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button
						variant="premium"
						className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
					>
						Comece a Gerar Gratuitamente
					</Button>
				</Link>
			</div>
			<div className="text-muted-foreground text-xs md:text-sm font-normal">
				Não é necessário cartão de crédito.
			</div>
		</div>
	);
};
