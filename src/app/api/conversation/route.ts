// New
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { checkApiLimit, increaseApiLmit } from '@/lib/api-limit';

import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!openai.apiKey) {
			return new NextResponse('Openai API Key not Configured', { status: 500 });
		}

		if (!messages) {
			return new NextResponse('Messages are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse('Free trial has expired', { status: 403 });
		}

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: messages,
		});

		if (!isPro) {
			await increaseApiLmit();
		}

		return NextResponse.json(response.choices[0].message);
	} catch (error) {
		console.log('[CONVERSATION_ERROR', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
