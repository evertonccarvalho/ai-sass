const ChatHeader = () => {
	return (
		<div className="w-full flex gap-3 justify-start items-center text-foreground">
			<div className="flex flex-col items-start text-sm">
				<p className="text-xs">Conversa com</p>
				<div className="flex gap-1.5 items-center">
					<p className="w-2 h-2 rounded-full bg-green-500" />
					<p className="font-medium">Kafra Suporte</p>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
