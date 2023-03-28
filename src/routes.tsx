import { createBrowserRouter } from 'react-router-dom';
import Cadastro from './pages/Cadastro/Index';
import Contato from './pages/Contato/Index';
import Login from './pages/Login/Index';
import { EditarPerfil } from './pages/Perfil/Form/EditPerfil';
import Perfil from './pages/Perfil/Index';
import Sobre from './pages/Sobre/Index';
import { TurmaNova } from './pages/TurmaNova';
import { Turmas } from './pages/Turmas';
import { TurmaTarefas } from './pages/TurmaTarefas';

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
		element: <Turmas />
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
	}
]);

