import { GlobalStyle } from './styles/GlobalStyles';
import { RouterProvider } from 'react-router-dom'; 
import { Router } from './routes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<RouterProvider router={Router} />
			<ToastContainer />
			<GlobalStyle />
		</>
	);
}

export default App;
