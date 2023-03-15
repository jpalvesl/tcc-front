import { GlobalStyle } from './styles/GlobalStyles';
import { RouterProvider } from 'react-router-dom'; 
import { Router } from './routes';

function App() {
	return (
		<>
			<RouterProvider router={Router} />
			<GlobalStyle />
		</>
	);
}

export default App;
