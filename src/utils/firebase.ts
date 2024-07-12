// Import the functions you need from the SDKs you need
import { clientConfig } from '@/configs';
import { StudentItem, StudentPayload, TodoItem } from '@/interfaces';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
	Query,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
} from 'firebase/firestore';

const app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0];

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
	prompt: 'select_account',
});

const db = getFirestore(app);
// connectFirestoreEmulator(db, '127.0.0.1', 8080);
export { db };
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

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
