'use client';

import { Resolver, useForm } from 'react-hook-form';
import {
	Box,
	Button,
	Center,
	Divider,
	FormControl,
	FormLabel,
	Input,
	Select,
	Stack,
	useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { StudentPayload } from '@/interfaces';
import { createStudent, getDistinctClassRooms } from '@/utils/firebase';
import { useListStudent } from '@/app/store';

const resolver: Resolver<StudentPayload> = async values => {
	return {
		values: values.name ? values : {},
		errors: !values.name
			? {
					name: {
						type: 'required',
						message: 'This is required.',
					},
			  }
			: {},
	};
};

const StudentForm = () => {
	const toast = useToast();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<StudentPayload>({ resolver });
	const { fetchListStudent } = useListStudent();
	const [classRooms, setClassRooms] = useState<string[]>([]);
	const [filterClass, setFilterClass] = useState<string>();
	const [filterMath, setFilterMath] = useState<string>();

	const onSubmit = async (values: StudentPayload) => {
		const error = await createStudent(values);
		if (error) {
			toast({
				title: 'Create student failed!, ' + error,
				status: 'error',
			});
		} else {
			toast({
				title: 'Create student successfully!',
				status: 'success',
			});
			reset();
			await fetchListStudent({ classValue: filterClass });
		}
	};

	useEffect(() => {
		(async () => {
			const list = await getDistinctClassRooms();
			setClassRooms(list);
		})();
	}, []);

	useEffect(() => {
		fetchListStudent({ classValue: filterClass, mathValue: filterMath });
	}, [filterClass, filterMath]);

	return (
		<Box shadow='base' padding={5}>
			<Stack
				display='flex'
				flexDir='row'
				gap={3}
				justifyContent='center'
				alignItems='center'
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack display='flex' flexDir='row' gap={4}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								type='text'
								{...register('name')}
								border='1px solid #efefef'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Class</FormLabel>
							<Input
								type='text'
								{...register('classRoom')}
								border='1px solid #efefef'
							/>
						</FormControl>
					</Stack>

					<Stack display='flex' flexDir='row' gap={4} mt={4}>
						<FormControl>
							<FormLabel>Math</FormLabel>
							<Input
								type='text'
								{...register('math')}
								border='1px solid #efefef'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Literature</FormLabel>
							<Input
								type='text'
								{...register('literature')}
								border='1px solid #efefef'
							/>
						</FormControl>

						<FormControl>
							<FormLabel>English</FormLabel>
							<Input
								type='text'
								{...register('english')}
								border='1px solid #efefef'
							/>
						</FormControl>
					</Stack>

					<Button
						colorScheme='green'
						type='submit'
						mt={4}
						display='block'
						marginLeft='auto'
						marginRight='auto'
						isLoading={isSubmitting}
					>
						Submit
					</Button>
				</form>
				<Center height='150px'>
					<Divider orientation='vertical' />
				</Center>
				<Stack w='40%' display='flex' gap={3}>
					<Select
						placeholder='Select class'
						value={filterClass}
						onChange={e => setFilterClass(e.target.value)}
					>
						{classRooms.map(clr => (
							<option value={clr} key={clr}>
								{clr}
							</option>
						))}
					</Select>

					<Select
						placeholder='Filter Math'
						value={filterMath}
						onChange={e => setFilterMath(e.target.value)}
					>
						<option value='>=8'>{'>=8'}</option>
						<option value='<8'>{'<8'}</option>
					</Select>
				</Stack>
			</Stack>
		</Box>
	);
};

export default StudentForm;
