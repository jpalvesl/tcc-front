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
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TurmaService from '../../services/TurmaService';
import { Turma } from '../../types/Turma';



function Turmas() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [turmas, setTurmas] = useState<Array<Turma>>([]);
	const [turmasProfessor, setTurmasProfessor] = useState<Array<Turma>>([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function initializeData() {
			const { data } = await TurmaService.findByUsuario(1);
			setTurmas(data);
		}

		initializeData();
	}, []);

	function handleCriarTurma() {
		navigate('nova');
	}

	function showModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	function deleteTurma() {
		// requisicao para apagar a turma
		toast.info('Turma exlcuida com sucesso');
		closeModal();
	}


	return (
		<>
			<NavBar />
			<TurmasContainer>
				<TurmasTitle>Turmas</TurmasTitle>
				
				<Divider />

				<SearchRow>
					<Input size='large' placeholder='Buscar turma...' />

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
						{turmasProfessor?.map((turma, idx) => (
							<TurmaRow key={`${turma.id}-${idx}`}>
								<TurmaInfo>
									<Link to={`/turma/${turma.id}`}>
										<h3>{turma.nomeTurma} - {turma.semestre}</h3>
									</Link>
									<Link to={`/instituicao/${turma.instituicaoId}`}>
										<span>{turma.instituicaoId}</span>
									</Link>
								</TurmaInfo>

								<TurmaActions>
									<Button size='large' onClick={handleCriarTurma} >
										<EditOutlined />
									</Button>
									<Button size='large' onClick={showModal}>
										<DeleteOutlined />
									</Button>
								</TurmaActions>
							</TurmaRow>
						))}
						<Divider/>
					</>
				)}



				<h2 style={{ fontSize: 32, paddingLeft: 16, marginBottom: 16, fontFamily: 'Poppins' }}>Turmas como aluno</h2>
				{turmas?.map((turma, idx) => (
					<TurmaRow key={`${turma.id}-${idx}`}>
						<TurmaInfo>
							<Link to={`/turma/${turma.id}`}>
								<h3>{turma.nomeTurma} - {turma.semestre}</h3>
							</Link>
							<Link to={`/instituicao/${turma.instituicaoId}`}>
								<span>{turma.instituicaoId}</span>
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
