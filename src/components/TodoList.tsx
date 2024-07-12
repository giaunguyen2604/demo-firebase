'use client';

import { TodoItem } from '@/interfaces';
import { auth, createTodo, deleteTodo, getListTodo } from '@/utils/firebase';
import { Box, Button, Input, Stack, Tag, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const TodoList = () => {
	const toast = useToast();
	const [creating, setCreating] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>();
	const [todo, setTodo] = useState<string>('');
	const [list, setList] = useState<TodoItem[]>([]);

	const fetchTodoList = async () => {
		const todoList = await getListTodo();
		setList(todoList);
	};

	useEffect(() => {
		fetchTodoList();
	}, []);

	const handleCreateTodo = async () => {
		if (!todo) return;
		setCreating(true);
		const error = await createTodo(todo);
		if (error) {
			toast({
				title: 'Create todo failed!, ' + error,
				status: 'error',
			});
		} else {
			toast({
				title: 'Create todo successfully!',
				status: 'success',
			});
			await fetchTodoList();
		}
		setCreating(false);
		setTodo('');
	};

	const handleDeleteTodo = async (id: string) => {
		setDeleteId(id);
		const error = await deleteTodo(id);
		if (error) {
			toast({
				title: 'Delete todo failed!, ' + error,
				status: 'error',
			});
		} else {
			toast({
				title: 'Delete todo successfully!',
				status: 'success',
			});
			await fetchTodoList();
		}
		setDeleteId(undefined);
	};

	return (
		<Box>
			<Stack
				display='flex'
				flexDir='row'
				gap={2}
				justifyContent={'center'}
				alignItems={'center'}
				height='100px'
				px={5}
				boxShadow='base'
			>
				<Input
					type='text'
					value={todo}
					onChange={e => setTodo(e.target.value)}
				/>
				<Button
					type='button'
					colorScheme='blue'
					onClick={handleCreateTodo}
					isDisabled={!todo}
					isLoading={creating}
				>
					Create
				</Button>
			</Stack>
			<Stack display='flex' alignItems='center' w='100%' mt={2}>
				{list.map(item => (
					<Stack
						key={item.id}
						display='flex'
						justifyContent='center'
						alignItems='center'
						p={2}
						boxShadow='md'
						w='100%'
						mt={2}
					>
						<Stack
							w='100%'
							display={'flex'}
							flexDir='row'
							gap={2}
							justifyContent='space-between'
							alignItems='center'
						>
							<p>{item.content}</p>
							<Stack display='flex' flexDir='row' gap={2}>
								<Tag borderRadius='full' variant='solid' colorScheme='green'>
									by {item.createdBy.displayName}
								</Tag>
								<Button
									size='xs'
									w='80px'
									type='button'
									colorScheme='red'
									isDisabled={creating || !!deleteId}
									isLoading={deleteId === item.id}
									onClick={() => handleDeleteTodo(item.id)}
								>
									Delete
								</Button>
							</Stack>
						</Stack>
					</Stack>
				))}
			</Stack>
		</Box>
	);
};

export default TodoList;
