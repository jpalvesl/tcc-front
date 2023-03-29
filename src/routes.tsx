import { useContext } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/auth';
import Cadastro from './pages/Cadastro/Index';
import Contato from './pages/Contato/Index';
import Login from './pages/Login/Index';
import { EditarPerfil } from './pages/Perfil/Form/EditPerfil';
import { AlterarSenha } from './pages/Perfil/Form/EditSenha';
import Perfil from './pages/Perfil/Index';
import Sobre from './pages/Sobre/Index';
import { TurmaNova } from './pages/TurmaNova';
import { Turmas } from './pages/Turmas';
import { TurmaTarefas } from './pages/TurmaTarefas';

const Private = ({Item}) => {

	const { signed } = useContext(AuthContext);
	return signed ? <Item /> : <Navigate to="/login" />;
};


export const Router = createBrowserRouter([

	
	{
		path: '/cadastro',
		element: <Cadastro />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/sobre',
		element: <Sobre />
	},
	{
		path: '/contato',
		element: <Contato />
	},
	{
		path: '/turma',
		element:<Private Item={Turmas} />
	},
	{
		path: '/turma/:turma_id',
		element: <TurmaTarefas />
	},
	{
		path: '/turma/nova',
		element: <TurmaNova />,
	},
	{
		path: '/perfil',
		element: <Perfil />
	},
	{
		path: '/perfil/:id',
		element: <EditarPerfil/>
	},
	{
		path: '/perfil/:id/password',
		element: <AlterarSenha/>
	}
]);

