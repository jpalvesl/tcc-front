import { Button, Divider, Input, Table } from 'antd';
import { NavBar } from '../../components/NavBar';
import { ContentContainer, ProvasSection, RoteirosSection, SearchRow, TarefasContainer, TarefasTitle } from './styles';
import { FilterOutlined,  PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Tarefa } from '../../types/Tarefa';
import TarefaService from '../../services/TarefaService';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';



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
	const navigate = useNavigate();

	function tarefasToColumns(tarefas: Tarefa[]) {
		return tarefas.map(tarefa => {
			const dtEncerramentoFormatado = tarefa.dtEncerramento.replaceAll('-', '/');

			return {
				...tarefa,
				key: tarefa.id,
				name: (
					<Link to={`/tarefa/${tarefa.id}`}>
						{tarefa.ehProva 
							? <Exam size={16}/> 
							: <Clipboard size={16}/>} {tarefa.titulo}
					</Link>),
				pontuacao: `0/${tarefa.qtdProblemas}`, 
				prazo: dtEncerramentoFormatado
			};
		});
	}

	function buscaTarefas(tarefas: Tarefa[]) {
		return tarefas.filter(tarefa => tarefa.titulo.toLowerCase().includes(searchText.toLowerCase().trim()));
	}
	

	useEffect(() => {
		async function loadTarefas() {

			const user = JSON.parse(localStorage.getItem('@Auth:user'));
			if (!user) return;



			const { data: tarefasData } = await TarefaService.findByAluno(user.id);
			setRoteiros(tarefasData.roteiros);
			setProvas(tarefasData.provas);
			
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
					<Input 
						size='large' 
						placeholder='Buscar tarefa' 
						value={searchText}
						onChange={(evt => setSearchText(evt.target.value))}
					/>
					
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
							dataSource={tarefasToColumns(buscaTarefas(provas))}
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
							dataSource={tarefasToColumns(buscaTarefas(roteiros))}
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