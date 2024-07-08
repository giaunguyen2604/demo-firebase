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
	apiKey: 'AIzaSyCkoiD4ZSNUPYezoR7_EKB8LoayE9D5Ax0',
	authDomain: 'image-gallery-a9ebb.firebaseapp.com',
	projectId: 'image-gallery-a9ebb',
	storageBucket: 'image-gallery-a9ebb.appspot.com',
	messagingSenderId: '881723409546',
	appId: '1:881723409546:web:bd1d7b62e1a2e32a145973',
	measurementId: 'G-TFXCYLM1EB',
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
