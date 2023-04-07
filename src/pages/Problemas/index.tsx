import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { Button, Input, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const dataSource = [
	{
		key: '1',
		nome: 'Fibonacci',
		autor: 'Henrique Cunha',
		dificuldade: 2,
		resolvido: <CheckCircle size={32} />
	},
	{
		key: '1',
		nome: 'Acidez de uma solução',
		autor: 'Henrique Cunha',
		dificuldade: 1,
		resolvido: <XCircle size={32} />
	},
	{
		key: '1',
		nome: 'Fatorial',
		autor: 'Jorge Luiz',
		dificuldade: 1,
	},
];

function Problemas() {
	const [searchText, setSearchText] = useState('');

	const navigate = useNavigate();

	function handleAddNovoProblema() {
		navigate('novo');
	}

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

					<Button 
						size='large' 
						style={{ width: '170px' }} 
						onClick={handleAddNovoProblema} 
					>
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
					dataSource={dataSource}
					pagination={false}
				/>
			</ProblemasContainer>
		</>
	);
}

export { Problemas };