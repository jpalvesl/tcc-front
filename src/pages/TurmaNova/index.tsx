import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Divider } from '../../components/Divider';

import { TurmaNovaContainer } from './styles';
import { NavBar } from '../../components/NavBar';
import { useContext, useEffect, useState } from 'react';
import TurmaService from '../../services/TurmaService';
import { Turma } from '../../types/Turma';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import UsuarioService from '../../services/UsuarioService';
import InstituicaoService from '../../services/InstituicaoService';
import { Instituicao } from '../../types/Instituicao';
import { Usuario } from '../../types/Usuario';

const { RangePicker } = DatePicker;

interface TurmaNovaState {
	actionType: 'UPDATE' | 'CREATE';
	turmaAtual?: Turma;
}

interface TurmaState {
	nome: string;
	semestre: string;
	instituicao: number;
	professores: [];
	monitores: [];
	datas: [never, never];
}

dayjs.extend(customParseFormat);



function TurmaNova() {
	const [turma, setTurma] = useState<Turma>({} as Turma);

	const [nome, setNome] = useState('');
	const [semestre, setSemestre] = useState('');
	const [instituicao, setInstituicao] = useState(0);
	const [professores, setProfessores] = useState([]);
	const [monitores, setMonitores] = useState([]);
	const [datas, setDatas] = useState<[never, never]>([]);

	const [professoresOptions, setProfessoresOptions] = useState([]);
	const [monitoresOptions, setMonitoresOptions] = useState([]);
	const [instituicoesOptions, setInstituicoesOptions] = useState([]);

	const navigate = useNavigate();
	const { state } = useLocation();
	
	const { actionType, turmaAtual } = state as TurmaNovaState;
	const { user } = useContext(AuthContext);
	

	useEffect(() => {
		async function loadInstituicoes() {
			const { data } = await InstituicaoService.findAll();

			const dadosFormatados = data.map((instituicao: Instituicao) => ({
				value: instituicao.id,
				label: `${instituicao.nome} - ${instituicao.campus}`
			}));
			
			setInstituicoesOptions(dadosFormatados);

			loadProfessoresEAlunos(user.instituicaoAtualId);
			// setTurma({
			// 	...turmaAtual,
			// 	instituicaoId: user.instituicaoAtualId
			// });
		}

		loadInstituicoes();
	}, []);

	const formataData = () => {
		const dtAbertura = dayjs(turmaAtual?.dtAbertura);
		const dtEncerramento = dayjs(turmaAtual?.dtEncerramento);

		return [dtAbertura, dtEncerramento];
	};
	

	async function loadProfessoresEAlunos(instituicaoId: number) {
		const { data } = await UsuarioService.findAlunoByInstituicao(instituicaoId);
		
		setMonitoresOptions(data.map((aluno: Usuario) => ({
			value: aluno.id,
			label: aluno.nome
		})));
		
		const { data: data2 } = await UsuarioService.findProfessorByInstituicao(instituicaoId);
		
		setProfessoresOptions(data2
			.filter(professor => professor.id !== user.id)
			.map((professor: Usuario) => ({
				value: professor.id,
				label: professor.nome
			})));
	}

	function handleChangeInstituicao(instituicaoId: number) {
		setInstituicao(instituicaoId);
		

		loadProfessoresEAlunos(instituicaoId);
	}

	function handleChangeProfessores(professores) {
		setProfessores(professores);
	}
	
	function handleChangeMonitores(alunos) {
		setMonitores(alunos);
	}
	
	
	async function handleOnFinish(criadorId: number) {
		if (actionType === 'CREATE'){
			TurmaService.add(criadorId, turma)
				.then(() => {
					toast('Turma Criada com sucesso.');
					navigate('/turma');
				})
				.catch((err) => toast(`Erro ao criar Turma\n${err.response.data.message}`));
		} else {
			TurmaService.edit(criadorId, turma)
				.then(() => {
					toast('Turma Criada com sucesso.');
					navigate('/turma');
				})
				.catch(() => toast('Erro ao criar Turma'));
		}
		
	}
	
	return (
		<>
			<NavBar />    
			<TurmaNovaContainer>
				<h1>{actionType === 'CREATE' ? 'Criar Turma' : 'Editar Turma'}</h1>
				<Divider />
				<Form 
					layout='vertical'
					initialValues={{
						...turmaAtual,
						nome: turmaAtual?.nomeTurma,
						instituicao: user.instituicaoAtualId,
						datas: formataData(),
						professores: turmaAtual?.professores.map(professor => ({
							value: professor.id,
							label: professor.nome
						})),
						monitores: turmaAtual?.monitores.map(monitor => ({
							label: monitor.nome,
							value: monitor.id
						})),
					}}
					onFinish={() => handleOnFinish(user.id)}
				>
					<Form.Item
						label="Nome"
						name='nome'
					>
						<Input 
							size='large'
							value={nome}
							onChange={(evt) => setNome(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item 
						label="Semestre"
						name='semestre'
					>
						<Input 
							size='large' 
							value={semestre}
							onChange={(evt) => setSemestre(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item 
						label="Instituicao"
						name='instituicao'
					>
						<Select
							size='large'
							// disabled
							value={instituicao}
							onChange={(value) => handleChangeInstituicao(value)}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item 
						label="Professores"
						name='professores'
					>
						<Select
							size='large'
							mode='multiple'
							allowClear
							value={professores}
							onChange={(value) => handleChangeProfessores(value)}							
							options={professoresOptions}
						/>
					</Form.Item>

					<Form.Item 
						label="Monitores" 
						name='monitores'
					>
						<Select
							size='large'
							mode='multiple'
							allowClear
							value={monitores}
							onChange={(value) => handleChangeMonitores(value)}							
							options={monitoresOptions}
						/>
					</Form.Item>

					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<Form.Item 
							label="Datas"
							name='datas'
						>
							<RangePicker 
								size='large'
								locale={locale}
								value={datas}
								onChange={(datas) => {
									const datasFormatadas = datas?.map((dateDayJs) => {
										
										return dateDayJs?.toISOString().substring(0,10);
									});								
									
									setDatas(datasFormatadas);
								}}
							/>
						</Form.Item>

						<Button size='large' style={{ width: '100%', marginTop: 4 }} htmlType='submit'>
							{actionType === 'CREATE' ? 'Criar Turma' : 'Editar Turma'}
						</Button>
					</div>
				</Form>
			</TurmaNovaContainer>
		</>
	);
}

export { TurmaNova };