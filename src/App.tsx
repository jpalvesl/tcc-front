import { GlobalStyle } from './styles/GlobalStyles';
import { RouterProvider } from 'react-router-dom'; 
import { Router } from './routes';
import { AuthProvider } from './contexts/auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-vertical-timeline-component/style.min.css';

function App() {
	return (
		<>
			<AuthProvider>
				<RouterProvider router={Router} />
				<ToastContainer />
				<GlobalStyle />
			</AuthProvider>
			
		</>
	);
}

export default App;
