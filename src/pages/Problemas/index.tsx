import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import ProblemaService from '../../services/ProblemaService';
import { Problema } from '../../types/Problema';
import { ProblemasContainer, SearchRow } from './styles';

const columns: ColumnsType<any> = [
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
		align: 'center'
	},
	{
		title: 'Resolvido',
		dataIndex: 'resolvido',
		key: 'resolvido',
		align: 'center'
	},
];

function Problemas() {
	const [searchText, setSearchText] = useState('');
	const [problemas, setProblemas] = useState<Problema[]>([]);

	const navigate = useNavigate();


	const problemasFiltradosToColumns = problemas
		.filter(problema => problema.nome.toLowerCase().includes(searchText.toLowerCase().trim()))
		.map(problema => {
			return {
				...problema,
				key: problema.id,
				resolvido: '',
				nome: (
					<Link 
						to={`/problema/${problema.id}`}
						style={{ fontWeight: 'bold' }}
					>
						{problema.nome}
					</Link>
				)
			};

		});

	function handleAddNovoProblema() {
		navigate('novo');
	}

	useEffect(() => {
		async function buscaProblemas() {
			const { data: problemasResponse } = await ProblemaService.findAll();

			setProblemas(problemasResponse);
		}

		document.title = 'Listagem de problemas';
		buscaProblemas();
	}, []);

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
					dataSource={problemasFiltradosToColumns}
					pagination={false}
				/>
			</ProblemasContainer>
		</>
	);
}

export { Problemas };