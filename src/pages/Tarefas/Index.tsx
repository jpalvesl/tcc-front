import { Button, Divider, Input, Table } from 'antd';
import { NavBar } from '../../components/NavBar';
import { ContentContainer, ProvasSection, RoteirosSection, SearchRow, TarefasContainer, TarefasTitle } from './styles';
import { FilterOutlined, KeyOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Tarefa } from '../../types/Tarefa';
import TarefaService from '../../services/TarefaService';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';

const dataSourceProvas = [
	{
		key: '1',
		name: (
			<div>
				<Exam size={16}/> Prova 3 - Operações matemáticas
			</div>),
		pontuacao: '16/17',
		prazo: '31/12/2022',
	},
	{
		key: '2',
		name: (
			<div>
				<Exam size={16}/> Prova 1 - Laço While
			</div>),
		pontuacao: '7/10',
		prazo: '31/12/2022',
	},
];

const columnsProvas = [
	{
		title: '',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Pontuação',
		dataIndex: 'pontuacao',
		key: 'pontuacao',
	},
	{
		title: 'Prazo',
		dataIndex: 'prazo',
		key: 'prazo',
	},
];


const dataSourceRoteiros = [
	{
		key: '1',
		name: (
			<div>
				<Clipboard size={16}/> Roteiro 5 - Funções
			</div>),
		pontuacao: '16/17',
		prazo: '31/12/2022',
	},
	{
		key: '2',
		name: (
			<div>
				<Clipboard size={16}/> Roteiro 7 - Recursividade
			</div>),
		pontuacao: '7/10',
		prazo: '31/12/2022',
	},
];

const columnsRoteiros = [
	{
		title: '',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Pontuação',
		dataIndex: 'pontuacao',
		key: 'pontuacao',
	},
	{
		title: 'Prazo',
		dataIndex: 'prazo',
		key: 'prazo',
	},
];


function Tarefas() {

	const [roteiros, setRoteiros] = useState<Tarefa[]>([]);
	const [provas, setProvas] = useState<Tarefa[]>([]);
	const [searchText, setSearchText] = useState('');
	const [tarefas, setTarefas] = useState<Array<Tarefa>>([]);
	const navigate = useNavigate();
	
	const tarefasFiltradas = tarefas.filter((turma) => (turma.titulo?.toLowerCase()?.startsWith(searchText.toLowerCase())));

	useEffect(() => {
		async function loadTarefas() {

			const { data: roteirosData } = await TarefaService.findByAluno(199952);
			setRoteiros(roteirosData);
		}

		loadTarefas();
	}, []);

	function handleCriarTarefa() {
		navigate('nova');
	}


	return (
		<>
			<NavBar />
			<TarefasContainer>
				<TarefasTitle>Tarefas</TarefasTitle>
				
				<Divider />

				<SearchRow>
					<Input size='large' placeholder='Buscar tarefa' />
					<Button size='large' style={{ width: '150px' }} onClick={handleCriarTarefa} >
						<PlusOutlined />
						Nova Tarefa
					</Button>
					<Button size='large' >
						<FilterOutlined />
					</Button>
				</SearchRow>
				
				<ContentContainer>
					<ProvasSection>
						<h2>Provas</h2>
						<Table 
							size='middle'
							bordered
							dataSource={provas.map((prova, idx) => (
								{
									key: idx,
									name: 'Teste',
									pontuacao: '1',
									prazo: '10/10/2023'
								}
							))}
							columns={columnsProvas}
							pagination={false}
						/>
					</ProvasSection>

					<Divider />

					<RoteirosSection>
						<h2>Roteiros</h2>
						<Table
							size='middle'
							bordered
							dataSource={roteiros.map((roteiro, idx) => (
								{
									key: idx,
									name: (
										<>
											<Clipboard size={16} key={idx}/> <Link to={`/tarefa/${roteiro.id}`}>{roteiro.descricao}</Link>
										</>
									),
									pontuacao: 'x',
									prazo: roteiro.dtEncerramento.replaceAll('-', '/')
								}
							))}
							columns={columnsRoteiros}
							pagination={false}
						/>
					</RoteirosSection>

					
				</ContentContainer>

			

			</TarefasContainer>
			
		</>
	);
}

export { Tarefas };
