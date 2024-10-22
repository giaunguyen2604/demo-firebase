'use client';

import { signInWithGooglePopup } from '@/utils/firebase';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '../store';

const LoginPage = () => {
	const toast = useToast();
	const router = useRouter();
	const { setUser } = useAuth();

	const handleLogin = async () => {
		try {
			const credential = await signInWithGooglePopup();
			const idToken = await credential.user.getIdToken();
			await fetch('/api/login', {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});
			setUser(credential.user);

			router.push('/');
		} catch (error: any) {
			toast({
				title: error.message,
				status: 'error',
			});
		}
	};

	return (
		<Box
			w='100vw'
			maxW='600px'
			position='fixed'
			top='50%'
			left='50%'
			transform='auto'
			translateX='-50%'
			translateY='-50%'
			p={8}
			shadow='lg'
		>
			<h1 className='text-center text-[20px] font-bold'>Login</h1>
			<Button mt={4} colorScheme='gray' w='100%' onClick={handleLogin}>
				Login with Google
			</Button>
		</Box>
	);
};

export default LoginPage;
