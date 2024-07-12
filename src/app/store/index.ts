import { StudentItem } from '@/interfaces';
import { getListStudent, studentCollectionRef } from '@/utils/firebase';
import { UserCredential } from 'firebase/auth';
import { QueryConstraint, query, where } from 'firebase/firestore';
import { create } from 'zustand';

interface FilterStudent {
	classValue?: string;
	mathValue?: string;
}

interface listStudentState {
	data: StudentItem[];
	isFetching: boolean;
	fetchListStudent: (filter: FilterStudent) => Promise<void>;
}

export const useListStudent = create<listStudentState>(set => ({
	data: [],
	isFetching: false,
	fetchListStudent: async ({ classValue, mathValue }: FilterStudent) => {
		set(prev => ({ ...prev, isFetching: true }));
		let queryConstrains: QueryConstraint[] = [];
		if (classValue) {
			queryConstrains.push(where('classRoom', '==', classValue));
		}

		if (mathValue) {
			queryConstrains.push(where('math', mathValue === '>=8' ? '>=' : '<', 8));
		}

		const q = query(studentCollectionRef, ...queryConstrains);
		const list = await getListStudent(q);
		if (list) {
			set(prev => ({ ...prev, data: list, isFetching: false }));
		}
	},
}));

interface AuthState {
	user: UserCredential | null;
	setUser: (user: UserCredential | null) => void;
}

export const useAuth = create<AuthState>(set => ({
	user: null,
	setUser: (user: UserCredential | null) => set(() => ({ user })),
}));
