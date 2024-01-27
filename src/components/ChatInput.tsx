'use client';
import { cn } from '@/lib/utils';
import ReackMarkdown from 'react-markdown';

import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { HTMLAttributes, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { formSchema } from '@/app/(dashboard)/(routes)/conversation/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';
import axios from 'axios';
import { useProModal } from '@/hooks/use-pro-modal';
import { BotAvatar } from './bot-avatar';
import { UserAvatar } from './user-avatar';
import { Empty } from './empty';
import { Loader, SendIcon } from 'lucide-react';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = ({ className, ...props }: ChatInputProps) => {
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

			const response = await axios.post('/api/conversation', {
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
		<div className={cn('border-t py-2 border-secondary', className)}>
			<div className="h-64 overflow-y-scroll  overflow-x-hidden mx-2">
				{isLoading && (
					<div className="p-2 rounded-lg w-full flex items-center justify-center bg-muted">
						<Loader />
					</div>
				)}
				{messages.length === 0 && !isLoading && (
					<Empty label="Nenhuma conversa iniciada." />
				)}
				<div className="flex flex-col-reverse gap-2">
					{messages.map((message) => (
						<div
							key={message.content}
							className={cn(
								'p-2 w-full flex items-start gap-x-2  rounded-lg',
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
										<div className="overflow-auto w-full my-2  bg-background p-2 rounded-lg">
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
			<div className="absolute bottom-1 w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="
					rounded-lg 
					border		
					focus-within:shadow-sm
					flex items-center
					w-full
					mx-2
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
							className="w-8 absolute right-1 h-8"
							type="submit"
							disabled={isLoading}
							size="icon"
						>
							<SendIcon />
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ChatInput;
