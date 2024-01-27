import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
	{
		name: 'Joel',
		avatar: 'J',
		title: 'Engenheiro de Software',
		description: 'Esta é a melhor aplicação que já utilizei!',
	},
	{
		name: 'Antonio',
		avatar: 'A',
		title: 'Designer',
		description: 'Uso isso diariamente para gerar novas fotos!',
	},
	{
		name: 'Mark',
		avatar: 'M',
		title: 'CEO',
		description:
			'Este aplicativo mudou minha vida, não consigo imaginar trabalhar sem ele!',
	},
	{
		name: 'Mary',
		avatar: 'M',
		title: 'CFO',
		description:
			'O melhor da classe, definitivamente vale a assinatura premium!',
	},
];

export const LandingContent = () => {
	return (
		<div className="px-10 pb-20">
			<h2 className="text-center text-4xl text-foreground font-extrabold mb-10">
				Depoimentos
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{testimonials.map((item) => (
					<Card key={item.description} className="bg-muted border-none">
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div>
									<p className="text-lg">{item.name}</p>
									<p className="text-muted-foreground text-sm">{item.title}</p>
								</div>
							</CardTitle>
							<CardContent className="pt-4 px-0">
								{item.description}
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
