'use client';

import React, { useState } from 'react';
import TodoList from './TodoList';
import { Box, Button } from '@chakra-ui/react';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/store';

const TodoContainer = () => {
	const [loadingLogout, setLoadingOut] = useState<boolean>(false);
	const router = useRouter();
	const { user } = useAuth();

	const handleLogout = async () => {
		setLoadingOut(true);
		await auth.signOut();
		await fetch('/api/logout');
		setLoadingOut(false);

		router.push('/login');
	};

	return (
		<>
			<Button
				position='fixed'
				top={5}
				right={3}
				onClick={handleLogout}
				isLoading={loadingLogout}
			>
				Logout
			</Button>
			<TodoList />
			<Box position={'fixed'} left={2} bottom={2}>
				{user?.user.displayName}
			</Box>
		</>
	);
};

export default TodoContainer;
