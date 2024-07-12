'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../store';

export function Providers({ children }: { children: React.ReactNode }) {
	const auth = getAuth();
	const { setUser } = useAuth();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUser(user);
		});
	}, []);

	return <ChakraProvider>{children}</ChakraProvider>;
}
