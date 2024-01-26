'use client';

import ChatHeader from './ChatHeader';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import ChatInput from './ChatInput';

const Chat = () => {
	return (
		<Accordion
			type="single"
			collapsible
			className="absolute bg-white z-40 shadow"
		>
			<AccordionItem value="item-1">
				<div className="fixed right-8 w-80 bottom-8 bg-white border border-gray-200 rounded-md overflow-hidden">
					<div className="w-full h-full flex flex-col">
						<AccordionTrigger className="px-6 border-b border-zinc-300">
							<ChatHeader />
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col h-[300px]">
								<ChatInput className="w-full" />
							</div>
						</AccordionContent>
					</div>
				</div>
			</AccordionItem>
		</Accordion>
	);
};

export default Chat;
