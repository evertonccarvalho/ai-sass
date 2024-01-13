// New
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: messages,
		});

		return NextResponse.json(response.choices[0].message);
	} catch (error) {
		console.log('[CONVERSATIOn_ERROR', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
