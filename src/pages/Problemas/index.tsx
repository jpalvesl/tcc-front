import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import { useState } from 'react';
import { NavBar } from '../../components/NavBar';
import { ProblemasContainer, SearchRow } from './styles';

const columns = [
	{
		title: 'Nome',
		dataIndex: 'nome',
		key: 'nome',
	},
	{
		title: 'Autor',
		dataIndex: 'autor',
		key: 'autor',
	},
	{
		title: 'Dificuldade',
		dataIndex: 'dificuldade',
		key: 'dificuldade',
	},
	{
		title: 'Resolvido',
		dataIndex: 'resolvido',
		key: 'resolvido',
	},
];

function Problemas() {
	const [searchText, setSearchText] = useState('');

	return (
		<>
			<NavBar />
			<ProblemasContainer>
				<h1>Problemas</h1>
				<SearchRow>
					<Input 
						size='large' 
						placeholder='Digite o nome do problema que está procurando...' 
						value={searchText}
						onChange={(evt) => setSearchText(evt.target.value)}
					/>

					<Button size='large' style={{ width: '170px' }} onClick={() => {}} >
						<PlusOutlined />
						Novo Problema
					</Button>

					<Button size='large' >
						<FilterOutlined />
					</Button>
				</SearchRow>

				<Table 
					style={{ margin: 16 }} 
					columns={columns} 
					pagination={false}
				/>
			</ProblemasContainer>
		</>
	);
}

export { Problemas };