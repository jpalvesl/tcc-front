import { createBrowserRouter } from 'react-router-dom';
import Cadastro from './pages/Cadastro/Index';
import Login from './pages/Login/Index';

export const Router = createBrowserRouter([
	{
		path: '/cadastro',
		element: <Cadastro />
	},
	{
		path: '/login',
		element: <Login />
	},
]);

