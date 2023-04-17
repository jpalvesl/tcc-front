import { useContext } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/auth';
import Cadastro from './pages/Cadastro/Index';
import Contato from './pages/Contato/Index';
import { Home } from './pages/Home';
import Login from './pages/Login/Index';
import { EditarPerfil } from './pages/Perfil/Form/EditPerfil';
import { AlterarSenha } from './pages/Perfil/Form/EditSenha';
import Perfil from './pages/Perfil/Index';
import { Problema } from './pages/Problema';
import { CasosDeTeste } from './pages/Problema/CasosDeTeste';
import { ProblemaNovo } from './pages/ProblemaNovo';
import { Problemas } from './pages/Problemas';
import Sobre from './pages/Sobre/Index';
import { TurmaNova } from './pages/TurmaNova';
import { Turmas } from './pages/Turmas';
import { TurmaTarefas } from './pages/TurmaTarefas';
import { Tarefas } from './pages/Tarefas/Index';
import TarefaProblemas from './pages/Tarefa/Index';
import { TarefaNova } from './pages/NovaTarefa/Index';

const Private = ({Item}) => {

	const { signed } = useContext(AuthContext);
	return signed ? <Item /> : <Navigate to="/login" />;
};


export const Router = createBrowserRouter([

	{
		path: '/',
		element: <Home />
	},
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
		element: <Private Item={Turmas} />
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
		path: '/turma/editar',
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
	},
	{
		path: '/problema/:id',
		element: <Problema />
	},
	{
		path: '/problema',
		element: <Problemas />
	},
	{
		path: '/problema/novo',
		element: <ProblemaNovo />
	},
	{
		path: '/problema/casos_de_teste',
		element: <CasosDeTeste />
	},
	{
		path: '/tarefas',
		element: <Tarefas />
	},
	{
		path: '/tarefa/:id',
		element: <TarefaProblemas/>
	},
	{
		path: '/tarefas/nova',
		element: <TarefaNova/>
	},
	{
		path: '/tarefa/:id/editar',
		element: <TarefaNova />,
	},
]);

