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
			TurmaService.edit(turmaAtual.id, criadorId, turma)
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
					onFinish={() => handleOnFinish(user.id)}
				>
					<Form.Item label="Nome">
						<Input 
							size='large' 
							value={nome}
							onChange={(evt) => setNome(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item label="Semestre">
						<Input 
							size='large' 
							value={semestre}
							onChange={(evt) => setSemestre(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item label="Instituicao">
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

					<Form.Item label="Datas">
						<RangePicker 
							size='large'
							locale={locale} 
							onChange={(datas) => {
								const datasFormatadas = datas?.map((dateDayJs) => dateDayJs?.toISOString().substring(0,10));								
								setDatas(datasFormatadas);
							}}
						/>
					</Form.Item>

					<Button size='large' style={{ width: '100%' }} htmlType='submit'>
						{actionType === 'CREATE' ? 'Criar Turma' : 'Editar Turma'}
					</Button>
				</Form>
			</TurmaNovaContainer>
		</>
	);
}

export { TurmaNova };