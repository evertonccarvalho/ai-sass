'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure('8968ad0f-ac13-4891-b82a-22fc1bad6bf1');
	}, []);

	return null;
};
