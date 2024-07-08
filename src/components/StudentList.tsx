'use client';

import {
	Box,
	Spinner,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import React from 'react';
import StudentRecord from './StudentRecord';
import { useListStudent } from '@/app/store';
import { AnimatePresence, motion } from 'framer-motion';

const StudentList = () => {
	const { data, isFetching } = useListStudent();

	return (
		<Box mt={8} padding={4} boxShadow='inner'>
			<AnimatePresence>
				{isFetching && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Spinner margin='0 auto' display='block' />
					</motion.div>
				)}
			</AnimatePresence>

			<TableContainer>
				<Table variant='striped' colorScheme='gray'>
					<TableCaption>List students</TableCaption>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Class</Th>
							<Th>Math</Th>
							<Th>Literature</Th>
							<Th>English</Th>
							<Th>Average</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map(s => (
							<StudentRecord key={s.id} {...s} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default StudentList;
