'use client';

import * as z from 'zod';
import axios from 'axios';
import { Code, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { BotAvatar } from '@/components/bot-avatar';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/loader';
import { UserAvatar } from '@/components/user-avatar';
import ReackMarkdown from 'react-markdown';
import { formSchema } from './constants';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';
import { Empty } from '@/components/empty';
import { useProModal } from '@/hooks/use-pro-modal';

const CodePage = () => {
	const router = useRouter();
	const proModal = useProModal();
	const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage = {
				role: 'user',
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/code', {
				messages: newMessages,
			});
			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				console.log('Something went wrong.');
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Geração de Código"
				description="Gere código usando texto descritivo"
				icon={Code}
				iconColor="text-green-500"
				bgColor="bg-green-500/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="Digite sua mensagem aqui..."
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								type="submit"
								disabled={isLoading}
								size="icon"
							>
								Enviar Mensagem
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="Nenhuma conversa iniciada." />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									'p-8 w-full flex items-start gap-x-8 rounded-lg',
									message.role !== 'assistant'
										? 'bg-foreground text-background border border-black/10'
										: 'bg-muted'
								)}
							>
								{message.role === 'assistant' ? <BotAvatar /> : <UserAvatar />}
								{/* <p className="text-sm">{message.content}</p> */}
								<ReackMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code className="bg-back/10 rounded-lg p-1" {...props} />
										),
									}}
									className="text-sm overflow-hidden leading-7"
								>
									{message.content || ''}
								</ReackMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CodePage;
