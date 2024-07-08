export interface TodoItem {
	id: string;
	content: string;
	createdAt: number;
}

export interface StudentPayload {
	name: string;
	classRoom: string;
	math: number;
	literature: number;
	english: number;
	createdAt: number;
	updatedAt: number;
}

export interface StudentItem extends StudentPayload {
	id: string;
}
