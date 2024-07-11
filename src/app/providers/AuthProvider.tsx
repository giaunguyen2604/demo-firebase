'use client';

import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '../store';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useRouter();
	const { user, setUser } = useAuth();

	useEffect(() => {
		navigate.push(user ? '/' : '/login');
	}, [user]);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user);
		});
	}, []);

	return <>{children}</>;
};

export default AuthProvider;
