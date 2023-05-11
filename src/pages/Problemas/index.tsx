import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import ProblemaService from '../../services/ProblemaService';
import { Problema } from '../../types/Problema';
import { ProblemasContainer, SearchRow } from './styles';
import { decrypt } from '../../utils/crypto';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import UsuarioService from '../../services/UsuarioService';
import { Usuario } from '../../types/Usuario';


interface State {
  run: boolean;
  steps: Step	[];
}

const stepsUsuarioAluno = [
	{
		disableBeacon: true,
		floaterProps: {
			disableAnimation: true,
		},
		spotlightPadding: 20,
		placement: 'center',
		target: 'body',
		content: 'Comece o tour'
	},
	{
		
		spotlightPadding: 20,
		target: '.filterProblema',
		content: 'Aqui você pode buscar pelo nome do problema'
	},
	{
		target: '.problemasList',
		content: 'Todos os problemas disponíveis no sistema para você acessar'
	},
];

const stepsUsuarioProfessor = [
	{
		disableBeacon: true,
		floaterProps: {
			disableAnimation: true,
		},
		spotlightPadding: 20,
		placement: 'center',
		target: 'body',
		content: 'Comece o tour'
	},
	{
		
		spotlightPadding: 20,
		target: '.filterProblema',
		content: 'Aqui você pode buscar pelo nome do problema'
	},
	{
		spotlightPadding: 20,
		target: '.novoProblema',
		content: 'Aqui você pode criar um novo problema'
	},
	{
		target: '.problemasList',
		content: 'Todos os problemas disponíveis no sistema para você acessar'
	},
];

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
	
	const [usuario, setUsuario] = useState<Usuario>();

	const [{ run, steps }, setState] = useState<State>({
		run: false,
		steps: stepsUsuarioAluno,
	});

	const navigate = useNavigate();

	const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));

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
		const tour = localStorage.getItem('fez_tour_problemas');
		if (tour == null){
			
			usuario?.ehProfessor? setState({run: true, steps: stepsUsuarioProfessor}) : setState({run: true, steps: stepsUsuarioAluno});

		}
		async function buscaProblemas() {
			const { data: problemasResponse } = await ProblemaService.findAll();
			const { data: usuarioData } = await UsuarioService.findById(user.id);

			setProblemas(problemasResponse);
			setUsuario(usuarioData);
		}

		document.title = 'Listagem de problemas';
		buscaProblemas();
	}, []);

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { status, type } = data;
		console.log('status', status);
		if (status == STATUS.FINISHED){
			localStorage.setItem('fez_tour_problemas','fez');
		}
		const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

		if (finishedStatuses.includes(status)) {
			setState({ run: false });
		}

		
	};

	return (
		<>
			<NavBar />
			{console.log('run', run)}
			<Joyride
				callback={handleJoyrideCallback}
				run={run}
				styles={{
					options: {
						zIndex: 10000,
					},
				}} 
				continuous
				hideCloseButton
				scrollToFirstStep
				showProgress
				showSkipButton
				locale={{back: 'voltar', close: 'fechar', next: 'próximo', last: 'fechar'}}
				steps={usuario?.ehProfessor?stepsUsuarioProfessor: stepsUsuarioAluno}/>
			<ProblemasContainer>
				<h1>Problemas</h1>
				<SearchRow >
					<Input 
						className='filterProblema'
						size='large' 
						placeholder='Digite o nome do problema que está procurando...' 
						value={searchText}
						onChange={(evt) => setSearchText(evt.target.value)}
					/>

					{user?.ehProfessor && <Button
						className='novoProblema'
						size='large' 
						style={{ width: '170px' }} 
						onClick={handleAddNovoProblema} 
					>
						<PlusOutlined />
						Novo Problema
					</Button>}

					<Button size='large' >
						<FilterOutlined />
					</Button>
				</SearchRow>

				<Table
					className='problemasList' 
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