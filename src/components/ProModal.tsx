'use client';
import axios from 'axios';
import { useProModal } from '@/hooks/use-pro-modal';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import {
	Check,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	Video,
	Zap,
} from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useState } from 'react';

const tools = [
	{
		label: 'Conversação',
		icon: MessageSquare,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
	},
	{
		label: 'Geração de Música',
		icon: Music,
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
	},
	{
		label: 'Geração de Imagens',
		icon: ImageIcon,
		color: 'text-pink-500',
		bgColor: 'bg-pink-500/10',
	},
	{
		label: 'Geração de Vídeos',
		icon: Video,
		color: 'text-orange-500',
		bgColor: 'bg-orange-500/10',
	},
	{
		label: 'Geração de Código',
		icon: Code,
		color: 'text-green-500',
		bgColor: 'bg-green-500/10',
	},
];

export const ProModal = () => {
	const proModal = useProModal();
	const [loading, setloading] = useState(false);

	const onSubscribe = async () => {
		try {
			setloading(true);
			const response = await axios.get('/api/stripe');

			window.location.href = response.data.url;
		} catch (error) {
			console.log(error, 'STRIPE_CLIENT_ERROR');
		} finally {
			setloading(false);
		}
	};
	return (
		<div>
			<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
							<div className="flex items-center  gap-x-2 font-bold py-1">
								Atualize o Caibral
								<Badge variant="premium" className="uppercase text-sm py-1">
									Pro
								</Badge>
							</div>
						</DialogTitle>
						<DialogDescription className="text-center pt-2 space-y-2 text-foreground font-medium">
							{tools.map((tool) => (
								<Card
									key={tool.label}
									className="p-3 border-secondary/5 flex items-center justify-between"
								>
									<div className="flex items-center gap-x-4">
										<div className={cn('p-2 w-fit rounded-md ', tool.bgColor)}>
											<tool.icon className={cn('w-6 h-6', tool.color)} />
										</div>
										<div className="font-semibold text-sm">{tool.label}</div>
									</div>
									<Check className="text-primary w-5 h-5 " />
								</Card>
							))}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							disabled={loading}
							onClick={onSubscribe}
							size="lg"
							variant="premium"
							className="w-full"
						>
							Atualizar
							<Zap className="w-4 h-4 ml-2 fill-white" />
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
