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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';



function Turmas() {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			{/* <NavBar /> */}
			<TurmasContainer>
				<TurmasTitle>Turmas</TurmasTitle>
				
				<Divider />

				<SearchRow>
					<Input size='large' placeholder='Buscar turma...' />

					<Button size='large' style={{ width: '150px' }} >
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


				<h2 style={{ fontSize: 32, paddingLeft: 16, marginBottom: 16, fontFamily: 'Poppins' }}>Turmas como professor</h2>
				<TurmaRow>
					<TurmaInfo>
						<Link>
							<h3>Algoritmos-2022.2-EC-IFPB-CG-Turma-A</h3>
						</Link>
						<Link>
							<span>IFPB - Instituto Federal da Paraíba</span>
						</Link>
					</TurmaInfo>

					<TurmaActions>
						<Button size='large' >
							<EditOutlined />
						</Button>
						<Button size='large' onClick={showModal}>
							<DeleteOutlined />
						</Button>
					</TurmaActions>
				</TurmaRow>

				<TurmaRow>
					<TurmaInfo>
						<Link>
							<h3>Seleção LAR</h3>
						</Link>
						<Link>
							<span>IFPB - Instituto Federal da Paraíba</span>
						</Link>
					</TurmaInfo>

					<TurmaActions>
						<Button size='large' >
							<EditOutlined />
						</Button>
						<Button size='large' >
							<DeleteOutlined />
						</Button>
					</TurmaActions>
				</TurmaRow>


				<Divider/>
				<h2 style={{ fontSize: 32, paddingLeft: 16, marginBottom: 16, fontFamily: 'Poppins' }}>Turmas como aluno</h2>
				<TurmaRow>
					<TurmaInfo>
						<Link>
							<h3>Maratona de Programação</h3>
						</Link>
						<Link>
							<span>IFPB - Instituto Federal da Paraíba</span>
						</Link>
					</TurmaInfo>
				</TurmaRow>

			</TurmasContainer>
			<Modal title='Apagar turma' open={isModalOpen} onOk={deleteTurma} onCancel={closeModal}/>
		</>
	);
}

export { Turmas };
