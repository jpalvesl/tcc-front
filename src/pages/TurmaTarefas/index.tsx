import { FilterOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Button, Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import TarefaService from '../../services/TarefaService';
import TurmaService from '../../services/TurmaService';
import { Tarefa } from '../../types/Tarefa';
import { Turma } from '../../types/Turma';
import { TurmaTarefasContainer, 
	DescriptionContainer, 
	DescriptionLeft, 
	DescriptionRight, 
	SearchRow, 
	ContentContainer, 
	ProvasSection, 
	RoteirosSection, 
	MembrosSection,
} from './styles';

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

function TurmaTarefas() {
	const [turma, setTurma] = useState<Turma>();
	const [roteiros, setRoteiros] = useState<Tarefa[]>([]);
	const [provas, setProvas] = useState<Tarefa[]>([]);
	const [showMembros, setShowMembros] = useState(false);
	const [membros, setMembros] = useState([1, 2]);

	
	const { turma_id } = useParams();
	

	useEffect(() => {
		async function loadTurma() {
			const { data: turmasData } = await TurmaService.findById(Number(turma_id));
			setTurma(turmasData);

			const { data: roteirosData } = await TarefaService.findByAluno(1);
			setRoteiros(roteirosData);
		}

		loadTurma();
	}, []);
	return (
		<>
			<NavBar />    
			<TurmaTarefasContainer>
				<h1>Turmas</h1>

				<Divider />

				<DescriptionContainer>
					<DescriptionLeft>
						<p>
							<strong>Nome da turma: </strong> {turma?.titulo}
							<span>Criado em: {turma?.dtAbertura} | Encerra em {turma?.dtEncerramento}</span>
						</p>
						<p>
							<strong>Professor: </strong> Henrique do Nascimento Cunha
						</p>
					</DescriptionLeft>

					<DescriptionRight>
						<p>
							<strong>Instituição: </strong> Instituto Federal da Paraíba
						</p>
						<p>
							<strong>Monitor: </strong> Allan Bispo
						</p>
					</DescriptionRight>
				</DescriptionContainer>

				<SearchRow>
					<Input size='large' placeholder='Buscar tarefa' />

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
											<Clipboard size={16} key={idx}/> {roteiro.descricao}
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

					<MembrosSection>
						<h2 onClick={() => setShowMembros(!showMembros)} style={{ cursor: 'pointer' }}>
							{showMembros ? <PlusOutlined /> : <MinusOutlined />} Membros
						</h2>
						{showMembros 
							? membros.map((membro, idx) => (
								<div key={`${membro?.id}-${idx}`}>
									<img src="" alt="" />
									<span>Nome</span>
								</div>
							)) 
							: null}
					</MembrosSection>
				</ContentContainer>

			</TurmaTarefasContainer>
		</>
	);
}

export { TurmaTarefas };