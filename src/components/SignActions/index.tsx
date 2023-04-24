import { Button } from 'antd';
import { Link } from 'react-router-dom';

function SignActions() {
	return (
		<div style={{
			display: 'flex',
			gap: 8
		}}>
			<Link to='/cadastro'>
				<Button style={{ color: '#fff' }} size='large' type="ghost">Cadastrar</Button>
			</Link>
			<Link to='/login'>
				<Button size='large' type="primary">Entrar</Button>
			</Link>
		</div>
	);
}

export { SignActions };