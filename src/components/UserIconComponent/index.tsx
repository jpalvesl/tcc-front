import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon } from '../NavBar/styles';

function UserIconComponent() {
	const [items, setItems] = useState();

	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	function handleSair() {
		localStorage.removeItem('@Auth:user');
		localStorage.removeItem('@Auth:token');

		location.href = '/';
	}
  
	const userItems = [
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

	const admItems = [
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
			label: <Link to='/permissoes'>Gerenciar permissões</Link>
		},
		{
			key: '4',
			label: <Button type='ghost' onClick={handleSair}>Sair</Button>,
			danger: true
		}
	];

	useEffect(() => {
		user.ehAdministrador ? setItems(admItems) : setItems(userItems);
	}, []);

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