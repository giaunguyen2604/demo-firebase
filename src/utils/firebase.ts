// Import the functions you need from the SDKs you need
import { TodoItem } from '@/interfaces';
import { getApps, initializeApp } from 'firebase/app';
import {
	DocumentSnapshot,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
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
