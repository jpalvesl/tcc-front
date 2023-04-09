import { FilterOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Avatar, Button, Card, Col, Input, Row, Table } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

function TurmaTarefas() {
	const [searchText, setSearchText] = useState('');
	const [turma, setTurma] = useState<Turma>();
	const [roteiros, setRoteiros] = useState<Tarefa[]>([]);
	const [provas, setProvas] = useState<Tarefa[]>([]);
	const [showMembros, setShowMembros] = useState(false);
	const [membros, setMembros] = useState<Usuario[]>([]);

	
	const { turma_id } = useParams();

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
		async function loadTurma() {
			const { data: turmasData } = await TurmaService.findById(turma_id);
			setTurma(turmasData);

			const user = JSON.parse(localStorage.getItem('@Auth:user'));

			if (!user) return;

			const { data: tarefasData } = await TarefaService.findByTurma(turma_id);
			setRoteiros(tarefasData.roteiros);
			setProvas(tarefasData.provas);
			

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