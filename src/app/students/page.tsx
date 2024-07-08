'use client';

import StudentForm from '@/components/StudentForm';
import StudentList from '@/components/StudentList';
import { Box } from '@chakra-ui/react';
import React from 'react';

function Students() {
	return (
		<Box maxW='800px' margin='0 auto'>
			<StudentForm />
			<StudentList />
		</Box>
	);
}

export default Students;
