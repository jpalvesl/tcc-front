import { FilterOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Avatar, Button, Card, Col, Input, Row, Table } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import TarefaService from '../../services/TarefaService';
import TurmaService from '../../services/TurmaService';
import UsuarioService from '../../services/UsuarioService';
import { Tarefa } from '../../types/Tarefa';
import { Turma } from '../../types/Turma';
import { Usuario } from '../../types/Usuario';
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
	const [membros, setMembros] = useState<Usuario[]>([]);

	
	const { turma_id } = useParams();
	

	useEffect(() => {
		async function loadTurma() {
			const { data: turmasData } = await TurmaService.findById(turma_id);
			setTurma(turmasData);

			const user = JSON.parse(localStorage.getItem('@Auth:user'));
			console.log('user', user);

			if (!user) return;

			const { data: roteirosData } = await TarefaService.findByTurma(turma_id);
			setRoteiros(roteirosData);

			const { data: membrosData } = await UsuarioService.findByTurma(turma_id);
			setMembros(membrosData);
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
							<strong>Professor: </strong> {turma?.professores.map((professor, idx) => professor)}
						</p>
					</DescriptionLeft>

					<DescriptionRight>
						<p>
							<strong>Instituição: </strong> {turma?.instituicaoTitulo}
						</p>
						{turma?.monitores.length === 0
							? null
							: (
								<p>
									<strong>Monitor: </strong> {turma?.monitores.map((monitor, idx) => monitor)}
								</p>)}
						
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
							{showMembros ? <MinusOutlined /> : <PlusOutlined />} Membros
						</h2>
						<Row gutter={[16, 16]}>
							{showMembros 
								? membros.map((membro, idx) => (
									<Col 
										key={`${membro?.id}-${idx}`}
										span={6}
									>
										<Card
											style={{ width: 300, marginTop: 16 }}
										>
											<Meta
												avatar={<Avatar src={membro.imagemUrl} />}
												title={membro.nome}
											/>
										</Card>
									</Col>
								)) 
								: null}
						</Row>
					</MembrosSection>
				</ContentContainer>

			</TurmaTarefasContainer>
		</>
	);
}

export { TurmaTarefas };