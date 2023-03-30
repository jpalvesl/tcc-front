import { Button, Input, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, FilterOutlined, KeyOutlined, PlusOutlined } from '@ant-design/icons';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import { TurmasContainer,
	TurmasTitle, 
	SearchRow, 
	TurmaRow, 
	TurmaInfo, 
	TurmaActions 
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TurmaService from '../../services/TurmaService';
import { Turma } from '../../types/Turma';
import { AuthContext } from '../../contexts/auth';


function Turmas() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [turmas, setTurmas] = useState<Array<Turma>>([]);
	const [turmasProfessor, setTurmasProfessor] = useState<Array<Turma>>([]);
	const [turmaDeletadaId, setTurmaDeletadaId] = useState<number>();

	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	
	

	const turmasFiltradas = turmas.filter((turma) => (turma.titulo?.toLowerCase()?.startsWith(searchText.toLowerCase())));
	const turmasProfessorFiltradas = turmasProfessor.filter((turma) => (turma.titulo?.toLowerCase()?.startsWith(searchText.toLowerCase())));


	useEffect(() => {
		async function initializeData() {

			const { data } = await TurmaService.findByUsuario(user.id);
			
			setTurmas(data.aluno);
			setTurmasProfessor(data.professor);
		}

		initializeData();
	}, []);

	function handleCriarTurma() {
		navigate('nova', {
			state: {
				actionType: 'CREATE',
				turma: {}
			}
		});
	}

	function handleEditarTurma(actionType: string, turma: Turma) {
		navigate('editar', {
			state: {
				actionType,
				turmaAtual: turma
			}
		});
	}

	function showModal(turmaId?: number) {
		setTurmaDeletadaId(turmaId);
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	async function deleteTurma() {
		try {
			await TurmaService.delete(turmaDeletadaId!, user.id);
		
			const turmasAtuaisProfessor = turmasProfessor.filter(({ id }) => id !== turmaDeletadaId);

			setTurmasProfessor(turmasAtuaisProfessor);

			toast.info('Turma exlcuida com sucesso');
		} catch (error) {
			toast.info('Erro ao excluir turma');
		} finally {
			closeModal();
		}
	}


	return (
		<>
			<NavBar />
			<TurmasContainer>
				<TurmasTitle>Turmas</TurmasTitle>
				
				<Divider />

				<SearchRow>
					<Input 
						size='large' 
						placeholder='Buscar turma...' 
						value={searchText}
						onChange={(evt) => setSearchText(evt.target.value)}
					/>

					<Button size='large' style={{ width: '150px' }} onClick={handleCriarTurma} >
						<PlusOutlined />
						Nova Turma
					</Button>

					<Button size='large' >
						<KeyOutlined />
					</Button>


					<Button size='large' >
						<FilterOutlined />
					</Button>
				</SearchRow>


				{turmasProfessor?.length === 0 ? null : (
					<>
						<h2 style={{ fontSize: 32, paddingLeft: 16, marginBottom: 16, fontFamily: 'Poppins' }}>Turmas como professor</h2>
						{turmasProfessorFiltradas?.map((turma, idx) => (
							<TurmaRow key={`${turma.id}-${idx}`}>
								<TurmaInfo>
									<Link to={`/turma/${turma.id}`}>
										<h3>{turma.nomeTurma} - {turma.semestre}</h3>
									</Link>
									<Link to={`/instituicao/${turma.instituicaoId}`}>
										<span>{turma.instituicaoTitulo}</span>
									</Link>
								</TurmaInfo>

								<TurmaActions>
									<Button size='large' onClick={() => handleEditarTurma('UPDATE', turma)} >
										<EditOutlined />
									</Button>
									<Button size='large' onClick={() => showModal(turma.id)}>
										<DeleteOutlined />
									</Button>
								</TurmaActions>
							</TurmaRow>
						))}
						<Divider/>
					</>
				)}



				<h2 style={{ fontSize: 32, paddingLeft: 16, marginBottom: 16, fontFamily: 'Poppins' }}>Turmas como aluno</h2>
				{turmasFiltradas?.map((turma, idx) => (
					<TurmaRow key={`${turma.id}-${idx}`}>
						<TurmaInfo>
							<Link to={`/turma/${turma.id}`}>
								<h3>{turma.nomeTurma} - {turma.semestre}</h3>
							</Link>
							<Link to={`/instituicao/${turma.instituicaoId}`}>
								<span>{turma.instituicaoTitulo}</span>
							</Link>
						</TurmaInfo>
					</TurmaRow>
				))}

			</TurmasContainer>
			<Modal title='Apagar turma' open={isModalOpen} onOk={deleteTurma} onCancel={closeModal}/>
		</>
	);
}

export { Turmas };
