'use client';

import React, { useState } from 'react';
import TodoList from './TodoList';
import { Button } from '@chakra-ui/react';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

const TodoContainer = () => {
	const [loadingLogout, setLoadingOut] = useState<boolean>(false);
	const router = useRouter();

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
		</>
	);
};

export default TodoContainer;
