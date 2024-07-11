'use client';

import { signInWithGooglePopup } from '@/utils/firebase';
import { Box, Button, useToast } from '@chakra-ui/react';
import React from 'react';

const LoginPage = () => {
	const toast = useToast();

	const handleLogin = async () => {
		try {
			await signInWithGooglePopup();
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
