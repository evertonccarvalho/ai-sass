import * as z from 'zod';

export const formSchema = z.object({
	prompt: z.string().min(1, {
		message: 'prompt is required',
	}),
});

export const MessageSchema = z.object({
	id: z.string(),
	isUserMessage: z.boolean(),
	text: z.string(),
});

// array validator
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
