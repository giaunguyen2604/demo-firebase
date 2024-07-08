import { StudentItem } from '@/interfaces';
import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

const StudentRecord = ({
	name,
	classRoom,
	math,
	literature,
	english,
}: StudentItem) => {
	const average = ((math + literature + english) / 3).toFixed(2);

	return (
		<Tr>
			<Td>{name}</Td>
			<Td>{classRoom}</Td>
			<Td>{math}</Td>
			<Td>{literature}</Td>
			<Td>{english}</Td>
			<Td>{average}</Td>
		</Tr>
	);
};

export default StudentRecord;
