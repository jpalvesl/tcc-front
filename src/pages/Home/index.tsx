import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
	useEffect(() => {
		document.title = 'Home';
	}, []);

	return (
		<Link to='turma'>Turma</Link>
	);
};