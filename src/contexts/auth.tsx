import { isObject } from 'lodash';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../services/api';
import AuthService from '../services/AuthService';
import { encrypt, decrypt } from '../utils/crypto';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loadingStoreData = () => {
			let storageUser = localStorage.getItem('@Auth:user');
			if (storageUser === null) return;


			storageUser = decrypt(storageUser);
			const storageToken = localStorage.getItem('@Auth:token');

			if (storageUser && storageToken) {
				setUser(JSON.parse(storageUser));
			}
		};
		loadingStoreData();
	}, []);

	const signIn = async ({ usernameOrEmail , password }: {usernameOrEmail: string, password: string}) => {
		try {
			const { data: usuarioRetornado } = await AuthService.login(usernameOrEmail, password);

			const token = Math.random().toString(36).substring(2);

			if (!isObject(usuarioRetornado)) {
				alert('usuário não existe');
			} else {
				setUser(usuarioRetornado);
				api.defaults.headers.common[
					'Authorization'
				] = `Bearer ${token}`;

				const userEncrypted = encrypt(JSON.stringify(usuarioRetornado));

				localStorage.setItem('@Auth:user', userEncrypted);
				localStorage.setItem('@Auth:token', token);
			}
		} catch (error) {
			toast.warn('Usuário ou senha não encontrado');
			console.error(error);
		}
	};

	const singOut = () => {
		localStorage.clear();
		setUser(null);
		return <Navigate to="/" />;
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				signIn,
				singOut,
				signed: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};