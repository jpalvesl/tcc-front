import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import api from '../services/api';
import UsuarioService from '../services/UsuarioService';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loadingStoreData = () => {
			const storageUser = localStorage.getItem('@Auth:user');
			const storageToken = localStorage.getItem('@Auth:token');

			if (storageUser && storageToken) {
				setUser(JSON.parse(storageUser));
			}
		};
		loadingStoreData();
	}, []);

	const signIn = async ({ email , senha }: {email: string, senha: string}) => {
		try {
			const { data } = await UsuarioService.findByInstituicao(1);
			const response = await UsuarioService.findByInstituicao(1);
			

			const filtragem_email = data.filter(usuario => usuario.email == email );
			
			const filtragem_senha = filtragem_email.filter(usuario => usuario.senha == senha);
			const token = Math.random().toString(36).substring(2);
			

			if (filtragem_senha.length==0) {
				alert('usuário não existe');
			} else {
				setUser(filtragem_senha);
				api.defaults.headers.common[
					'Authorization'
				] = `Bearer ${token}`;

				localStorage.setItem('@Auth:user', JSON.stringify(filtragem_senha[0]));
				
				localStorage.setItem('@Auth:token', token);
			}
		} catch (error) {
			console.log(error);
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