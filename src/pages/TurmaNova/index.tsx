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

const { RangePicker } = DatePicker;

interface TurmaNovaState {
	actionType: 'UPDATE' | 'CREATE';
	turmaAtual?: Turma;
}

dayjs.extend(customParseFormat);



function TurmaNova() {
	const [nome, setNome] = useState('');
	const [semestre, setSemestre] = useState('');
	const [instituicao, setInstituicao] = useState('');
	const [professor, setProfessor] = useState([]);
	const [monitores, setMonitores] = useState([]);
	const [datas, setDatas] = useState([]);

	const navigate = useNavigate();
	const { state } = useLocation();
	
	const { actionType, turmaAtual } = state as TurmaNovaState;
	const { user } = useContext(AuthContext);
	console.log(actionType, turmaAtual);
	

	const formataData = () => {
		const dtAbertura = dayjs(turmaAtual?.dtAbertura, 'YYYY-MM-DD');
		const dtEncerramento = dayjs(turmaAtual?.dtEncerramento, 'YYYY-MM-DD');

		return [dtAbertura, dtEncerramento];
	};

	console.log(formataData());
	
	

	useEffect(() => {}, []);

	async function handleOnFinish(criadorId: number) {
		const turma: Turma = {
			...turmaAtual,
			nomeTurma: nome,
			semestre: semestre,
			dtAbertura: datas[0],
			dtEncerramento: datas[1],
			instituicaoId: 1, 
		};
		
		if (actionType === 'CREATE'){
			TurmaService.add(criadorId, turma)
				.then(() => {
					toast('Turma Criada com sucesso.');
					navigate('/turma');
				})
				.catch(() => toast('Erro ao criar conta'));
		} else {
			TurmaService.edit(criadorId, turma)
				.then(() => {
					toast('Turma Criada com sucesso.');
					navigate('/turma');
				})
				.catch(() => toast('Erro ao criar conta'));
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
						instituicao: turmaAtual?.instituicaoId,
						// datas: formataData()
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
							value={instituicao}
							onChange={(value) => setInstituicao(value)}
							options={[{ value: 'ifpb-cg', label: 'IFPB - Campina Grande' }, { value: 'ifpb-es', label: 'IFPB - Esperança' }]}
						/>
					</Form.Item>

					<Form.Item label="Professores">
						<Select
							size='large'
							value={professor}
							onChange={(value) => setProfessor(value)}							
							options={[{ value: '1', label: 'Henrique Cunha' }, { value: '2', label: 'Iana' }]}
						/>
					</Form.Item>

					<Form.Item label="Monitores">
						<Select
							size='large'
							// value={professor}
							// onChange={(value) => setProfessor(value)}							
							options={[{ value: '1', label: 'João Pedro' }, { value: '2', label: 'Myrlla Lucas' }]}
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
								onChange={(datas) => {
									console.log(datas);
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