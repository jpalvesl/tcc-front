import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Divider } from '../../components/Divider';

import { TurmaNovaContainer } from './styles';
import { NavBar } from '../../components/NavBar';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
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

dayjs.extend(customParseFormat);


function TurmaNova() {
	const [turma, setTurma] = useState<Turma>({} as Turma);

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

			
			// TODO: instituicao na criação não está funcionando corretamente
			setTurma({
				...turmaAtual,
				instituicaoId: user.instituicaoAtualId
			});
		}

		loadInstituicoes();
	}, []);

	function formataData() {
		if (!turmaAtual) return null;

		const dtAbertura = dayjs(turmaAtual?.dtAbertura);
		const dtEncerramento = dayjs(turmaAtual?.dtEncerramento);

		return [dtAbertura, dtEncerramento];
	}

	function formataInitialValues() {
		if (!turmaAtual) return null;

		return {
			...turmaAtual,
			nomeTurma: turmaAtual?.nomeTurma,
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
		};
	}

	function formataPayload(turma: Turma) {
		console.log(turma);
	}

	async function loadProfessoresEAlunos(instituicaoId: number) {
		const { data: alunosInstituicao } = await UsuarioService.findAlunoByInstituicao(instituicaoId);
		
		setMonitoresOptions(alunosInstituicao.map((aluno: Usuario) => ({
			value: aluno.id,
			label: aluno.nome
		})));
		
		const { data: professoresInstituicao } = await UsuarioService.findProfessorByInstituicao(instituicaoId);
		
		setProfessoresOptions(professoresInstituicao
			.filter((professor: Usuario) => professor.id !== user.id)
			.map((professor: Usuario) => ({
				value: professor.id,
				label: professor.nome
			})));
	}

	function updateTurmaInput(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		console.log({
			...turma,
			[evt.target.name]: evt.target.value
		});
		
		setTurma({
			...turma,
			[evt.target.name]: evt.target.value
		});
	}

	function handleChangeInstituicao(instituicaoId: number) {
		setTurma({
			...turma,
			instituicaoId
		});
		
		loadProfessoresEAlunos(instituicaoId);
	}

	function handleChangeProfessores(professoresId: number[]) {
		setTurma({
			...turma,
			professores: professoresId.map(id => ({
				id
			}))
		});
	}
	
	function handleChangeMonitores(alunosId: number[]) {
		setTurma({
			...turma,
			monitores: alunosId.map(id => ({
				id
			}))
		});
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
					initialValues={formataInitialValues()}
					onFinish={() => handleOnFinish(user.id)}
				>
					<Form.Item
						label="Nome da Turma"
					>
						<Input 
							size='large'
							name='nomeTurma'
							value={turma.nomeTurma}
							onChange={(evt) => updateTurmaInput(evt)}
						/>
					</Form.Item>

					<Form.Item 
						label="Semestre"
					>
						<Input 
							size='large'
							name='semestre'
							value={turma.semestre}
							onChange={(evt) => updateTurmaInput(evt)}
						/>
					</Form.Item>

					<Form.Item 
						label="Instituicao"
					>
						<Select
							size='large'
							disabled
							value={turma.instituicaoId}
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
							value={turma.professores}
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
							value={turma.monitores}
							onChange={(value) => handleChangeMonitores(value)}				
							options={monitoresOptions}
						/>
					</Form.Item>

					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<Form.Item 
							label="Datas"
						>
							<RangePicker 
								size='large'
								name='datas'
								locale={locale}
								value={datas}
								// onChange={(datas) => {
								// 	const datasFormatadas = datas?.map((dateDayJs) => {
										
								// 		return dateDayJs?.toISOString().substring(0,10);
								// 	});								
									
								// 	setDatas(datasFormatadas);
								// }}
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