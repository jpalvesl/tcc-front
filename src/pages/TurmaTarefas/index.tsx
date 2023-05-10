import { DeleteOutlined, EditOutlined, FilterOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Avatar, Button, Card, Col, Input, Modal, Row, Table } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { toast } from 'react-toastify';

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
	{
		title: '',
		dataIndex: 'botao',
		key: 'botao',
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
	{
		title: '',
		dataIndex: 'botao',
		key: 'botao',
	},
];

function TurmaTarefas() {
	const [searchText, setSearchText] = useState('');
	const [turma, setTurma] = useState<Turma>();
	const [roteiros, setRoteiros] = useState<Tarefa[]>([]);
	const [provas, setProvas] = useState<Tarefa[]>([]);
	const [showMembros, setShowMembros] = useState(false);
	const [membros, setMembros] = useState<Usuario[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tarefaDeletadaId, setTarefaDeletadaId] = useState<number>();
	const user = JSON.parse(localStorage.getItem('@Auth:user'));
	

	const navigate = useNavigate();

	
	const { turma_id } = useParams();

	function tarefasToColumns(tarefas: Tarefa[]) {
		return tarefas.map(tarefa => {
			const dtEncerramentoFormatado = tarefa.dtEncerramento.replaceAll('-', '/');

			return {
				...tarefa,
				key: tarefa.id,
				name: (
					<Link to={`/tarefa/${tarefa.id}/${turma?.id}`}>
						{tarefa.ehProva 
							? <Exam size={16}/> 
							: <Clipboard size={16}/>} {tarefa.titulo}
					</Link>),
				pontuacao: `0/${tarefa.qtdProblemas}`,
				prazo: dtEncerramentoFormatado,
				botao:<>{user?.ehProfessor && (<><Button size='large' onClick={() => showModal(tarefa.id)}>
					<DeleteOutlined /> 
				</Button><Button size='large' onClick={() => handleEditarTatefa('UPDATE', tarefa)} >
					<EditOutlined />
				</Button></>)}</> 
			};
		});
	}

	function buscaTarefas(tarefas: Tarefa[]) {
		return tarefas.filter(tarefa => tarefa.titulo.toLowerCase().includes(searchText.toLowerCase().trim()));
	}

	function handleCriarTarefa(turmaId) {
		navigate(`/tarefas/nova/${turmaId}`, {
			state: {
				actionType: 'CREATE',
				tarefa: {}
			}
		});
	}
	function handleEditarTatefa(actionType: string, tarefa: Tarefa) {
		navigate(`/tarefa/${tarefa.id}/${turma?.id}/editar`, {
			state: {
				actionType,
				tarefaAtual: tarefa
			}
		});
	}

	useEffect(() => {
		async function loadTurma() {
			document.title = 'Turmas';

			const { data: turmasData } = await TurmaService.findById(turma_id);
			document.title = turmasData.titulo;
			setTurma(turmasData);

			if (!user) return;

			const { data: tarefasData } = await TarefaService.findByTurma(turma_id);
			setRoteiros(tarefasData.roteiros);
			setProvas(tarefasData.provas);
			

			const { data: membrosData } = await UsuarioService.findByTurma(turma_id);
			setMembros(membrosData);
		}

		loadTurma();
	}, []);

	function showModal(turmaId?: number) {
		setTarefaDeletadaId(turmaId);
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	async function deleteTarefa() {
		try {
			const {data: tarefaDeletada} = await TarefaService.findById(tarefaDeletadaId);
			
			await TarefaService.delete(tarefaDeletadaId, user.id);
			
			if (!tarefaDeletada.ehProva){
				const roteirosAtuais = roteiros.filter(({ id }) => id !== tarefaDeletadaId);

				setRoteiros(roteirosAtuais);
			}
			else{
				const provasAtuais = provas.filter(({ id }) => id !== tarefaDeletadaId);

				setProvas(provasAtuais);
			}
		
			

			toast.info('Tarefa exlcuida com sucesso');
		} catch (error) {
			toast.info('Erro ao excluir tarefa');
		} finally {
			closeModal();
		}
	}
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
							<strong>Professor: </strong> {turma?.professores.map((professor, idx) => <p>{professor.nome}</p>)}
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
									<strong>Monitor: </strong> {turma?.monitores.map((monitor, idx) => <p>{monitor.nome}</p> )}
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
					{user?.ehProfessor && (<Button size='large' style={{ width: '150px' }} onClick={()=> handleCriarTarefa(turma?.id)} >
						<PlusOutlined />
						Nova Tarefa
					</Button>)}

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
			<Modal title='Apagar tarefa' open={isModalOpen} onOk={deleteTarefa} onCancel={closeModal}/>
		</>
	);
}

export { TurmaTarefas };