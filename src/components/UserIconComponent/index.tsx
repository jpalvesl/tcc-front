import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { UserIcon } from '../NavBar/styles';

function UserIconComponent() {
	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	function handleSair() {
		localStorage.removeItem('@Auth:user');
		localStorage.removeItem('@Auth:token');

		location.href = '/';
	}
  
	const items = [
		{
			key: '1',
			label: (
				<Link to='/perfil'>Perfil</Link>
			),
		},
		{
			key: '2',
			label: <Link to={`/perfil/${user.id}`}>Gerenciar conta</Link>
		},
		{
			key: '3',
			label: <Button type='ghost' onClick={handleSair}>Sair</Button>,
			danger: true
		}
	];

	return (
		<Dropdown menu={{ items }}>
			<Space>
				<UserIcon />
				<DownOutlined style={{ color: '#fff' }} />
			</Space>
		</Dropdown>
	);
} 

export { UserIconComponent };