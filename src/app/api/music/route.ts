import Replicate from 'replicate';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { prompt } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!prompt) {
			return new NextResponse('Prompt is required', { status: 400 });
		}

		const response = await replicate.run(
			'meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38',
			{
				input: {
					model_version: prompt,
				},
			}
		);

		return NextResponse.json(response);
	} catch (error) {
		console.log('[MUSIC_ERROR]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
