// Import the functions you need from the SDKs you need
import { StudentItem, StudentPayload, TodoItem } from '@/interfaces';
import { group } from 'console';
import { getApps, initializeApp } from 'firebase/app';
import {
	Query,
	collection,
	collectionGroup,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBVAB43yQJ8wydm3FWiYpEzwEvl1cCyER8',
	authDomain: 'fir-learning-38320.firebaseapp.com',
	projectId: 'fir-learning-38320',
	storageBucket: 'fir-learning-38320.appspot.com',
	messagingSenderId: '286709041019',
	appId: '1:286709041019:web:0751fc49e7d2c0761d9fde',
	measurementId: 'G-DW49NBVYS9',
};

const app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const todosCollectionRef = collection(db, 'todos');
export const studentCollectionRef = collection(db, 'students');

export const getListTodo = async (): Promise<TodoItem[]> => {
	const querySnapshot = await getDocs(query(todosCollectionRef));
	const todoList: TodoItem[] = [];

	querySnapshot.forEach(doc => {
		const data = doc.data() as TodoItem;
		if (data) {
			todoList.push({
				...data,
				id: doc.id,
			});
		}
	});

	return todoList;
};

export const createDocId = (): string => {
	const docRef = doc(collection(db, 'trigger'));
	return docRef.id;
};

export const createTodo = async (content: string): Promise<string> => {
	const createdAt = new Date().getTime();
	const id = createDocId();

	try {
		await setDoc(doc(db, 'todos', id), {
			content,
			createdAt,
		});
		return '';
	} catch (error: any) {
		return error.message;
	}
};

export const deleteTodo = async (id: string): Promise<string> => {
	try {
		await deleteDoc(doc(db, 'todos', id));
		return '';
	} catch (error: any) {
		return error.message;
	}
};

// STUDENT
export const getListStudent = async (query: Query): Promise<StudentItem[]> => {
	const querySnapshot = await getDocs(query);
	const studentList: StudentItem[] = [];

	querySnapshot.forEach(doc => {
		const data = doc.data() as StudentItem;
		if (data) {
			studentList.push({
				...data,
				id: doc.id,
			});
		}
	});

	return studentList;
};

export const createStudent = async (
	payload: StudentPayload
): Promise<string> => {
	const createdAt = new Date().getTime();
	const id = createDocId();

	const values: StudentPayload = {
		...payload,
		math: Number(payload.math),
		literature: Number(payload.literature),
		english: Number(payload.english),
		createdAt,
		updatedAt: createdAt,
	};
	try {
		await setDoc(doc(db, 'students', id), values);
		return '';
	} catch (error: any) {
		return error.message;
	}
};

export const getDistinctClassRooms = async (): Promise<string[]> => {
	const querySnapshot = await getDocs(studentCollectionRef);
	const classRooms = new Set<string>();

	querySnapshot.forEach(doc => {
		const data = doc.data();
		if (data.classRoom) {
			classRooms.add(data.classRoom);
		}
	});

	return Array.from(classRooms);
};

export const getByClassRoom = async (value: string): Promise<StudentItem[]> => {
	const querySnapshot = await getDocs(
		query(
			studentCollectionRef,
			where('classRoom', '==', value),
			where('math', '>', 8)
		)
	);

	const studentList: StudentItem[] = [];

	querySnapshot.forEach(doc => {
		const data = doc.data() as StudentItem;
		if (data) {
			studentList.push({
				...data,
				id: doc.id,
			});
		}
	});

	return studentList;
};
