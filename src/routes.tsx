import { createBrowserRouter } from 'react-router-dom';
import Cadastro from './pages/Cadastro/Index';
import Contato from './pages/Contato/Index';
import Login from './pages/Login/Index';
import Sobre from './pages/Sobre/Index';
import { Turmas } from './pages/Turmas';

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
	}
]);

