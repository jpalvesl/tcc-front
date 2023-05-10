import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { Button, Form, Input, Select, DatePicker, Table, Checkbox } from 'antd';
import { Divider } from '../../components/Divider';

import { ListaProblemas, ProblemaActions, ProblemaInfo, ProblemaRow, ProblemasAdicionados, TurmaNovaContainer } from './styles';
import { NavBar } from '../../components/NavBar';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Tarefa } from '../../types/Tarefa';
import TarefaService from '../../services/TarefaService';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Problema } from '../../types/Problema';
import ProblemaService from '../../services/ProblemaService';
import { AuthContext } from '../../contexts/auth';
import TurmaService from '../../services/TurmaService';
import { DeleteOutlined } from '@ant-design/icons';
import { Turma } from '../../types/Turma';
const { RangePicker } = DatePicker;


interface TarefaNovaState {
	actionType: 'UPDATE' | 'CREATE';
	tarefaAtual?: Tarefa;
}

function TarefaNova() {
	const { id } = useParams();
	const {turmaId} = useParams();
	const { user } = useContext(AuthContext);
	const { state } = useLocation();
	const navigate = useNavigate();
	const { actionType, tarefaAtual } = state as TarefaNovaState;
	const [titulo, setTitulo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [datas, setDatas] = useState([]);
	const [problemasTarefa, setProblemasTarefa] = useState([]);
	const [problemasTarefaInicial, setProblemasTarefaInicial] = useState<Problema[]>([]);
	const [roteiroPorTurma, setRoteirosPorTurma] = useState([]);
	const [provasPorTurma, setProvasPorTurma] = useState([]);
	const [problemasPorProva, setProblemasPorProva] = useState([]);
	const [problemasPorRoteiro, setProblemasPorRoteiro] = useState([]);
	const [options, setOptions] = useState([]);
	const [optionsTurma, setOptionsTurma] = useState([]);
	const [optionsRoteiros, setOptionsRoteiros] = useState([]);
	const [optionsProvas, setOptionsProvas] = useState([]);
	const [turma, setTurma] = useState([]);
	const [ehProva, setEhProva] = useState(Boolean);

	dayjs.extend(customParseFormat);

	useEffect(()=> {
		findProblemasTurmas();
		if(id !== undefined){
			findTask(id);
		}
		
		
	},[id]);

	async function findTask(id:number) {

		const {data} = await TarefaService.findById(id);
		setEhProva(data.ehProva);
		const dates = [data.dtEncerramento, data.dtAbertura];
		const {data: problemasTarefa} = await ProblemaService.findByTarefa(id);

		setTitulo(data.titulo);
		setDescricao(data.descricao);
		setDatas(dates);

		setProblemasTarefaInicial(problemasTarefa.map((problemas: Problema)=> {
			return {
				'value': problemas.id,
				'label': problemas.nome,
			};
		}));
		setProblemasTarefa(problemasTarefa.map((problemas: Problema)=> {
			return {
				'value': problemas.id,
				'label': problemas.nome,
			};
		}));	
	}

	async function findProblemasTurmas(){
		const {data: problemas} = await ProblemaService.findAll();
		const {data: turmas} = await TurmaService.findByUsuario(user.id);
		
		
		setOptions(problemas.map((problemas: Problema)=> {
			return {
				'value': problemas.id,
				'label': problemas.nome,
			};
		}));

		setOptionsTurma(turmas.professor.map((turma: Turma)=> {
			return {
				'value': turma.id,
				'label': turma.titulo,
			};
		}));
	}

	async function addProblemaTarefa(idTarefa: number) {
		problemasPorProva.map((problemas) => TarefaService.addProblemaEmTarefa(problemas.value,idTarefa, user.id));
		problemasPorRoteiro.map((problemas)=> TarefaService.addProblemaEmTarefa(problemas.value,idTarefa, user.id));
	}

	async function removerProblemaTarefa() {
		problemasTarefaInicial.filter(function (element, index, array) {console.log(element);if (problemasTarefa.indexOf(element.value)==-1) {console.log('element',element.value);}});
		problemasTarefa.map(function (element, index, array){ console.log('dentro do map', element);});
	}

	function formataData() {
		const dtAbertura = dayjs(tarefaAtual?.dtAbertura);
		const dtEncerramento = tarefaAtual?.dtEncerramento !== undefined? dayjs(tarefaAtual?.dtEncerramento): '';

		return [dtAbertura, dtEncerramento];
	}

	async function tarefasPorTurma(value){
		const {data: listTarefas} = await TarefaService.findByTurma(value);
		setOptionsProvas(listTarefas.provas
			.filter((tarefa: Tarefa) => tarefa.id !== id)
			.map((tarefas: Tarefa) => {
				return {
					'value': tarefas.id,
					'label': tarefas.titulo
				};
			}));

		setOptionsRoteiros(listTarefas.roteiros
			.filter((tarefa: Tarefa) => tarefa.id !== id)
			.map((tarefa: Tarefa) => {
				return {
					'value': tarefa.id,
					'label': tarefa.titulo
				};
			}));

	}

	async function problemaPorProva(value){
		const {data: listProblemasProva} = await ProblemaService.findByTarefa(value);
		setProblemasPorProva(listProblemasProva);
	}


	async function handleOnFinish(criadorId: number) {
		const tarefa: Tarefa = {
			...tarefaAtual,
			dtAbertura: datas[0],
			dtEncerramento: datas[1],
			descricao: descricao,
			titulo: titulo,
			criadorId: criadorId,
			problemas: problemasTarefa.map(problema => problema.value),
			turmaId:  parseInt(turmaId),
			ehProva: ehProva,
		};

		if (actionType === 'CREATE'){
			const response = await TarefaService.add(tarefa);
			
			addProblemaTarefa(response.data.id);
			navigate(`/turma/${turmaId}`);

		} else {
			addProblemaTarefa(id);

			
			

			TarefaService.edit(tarefa, criadorId).then(() => {
				toast('Tarefa editada com sucesso.');
				navigate(`/tarefa/${id}/${turmaId}`);
			}).catch(() => toast('Erro ao editar tarefa'));
		}
	}
	
	return (
		<>
			<NavBar />    
			<TurmaNovaContainer>
				<h1>{actionType === 'CREATE' ? 'Criar Tarefa' : 'Editar Tarefa'}</h1>
				<Divider />
				{<Form 
				
					layout='vertical'
					onFinish={() => handleOnFinish(user.id)}
				>
					<Form.Item style={{ marginBottom: 0 }}>
						<Form.Item label="Titulo" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
							<Input 
								size='large' 
								value={titulo}
								onChange={(evt) => setTitulo(evt.target.value)}
							/>
						</Form.Item>
						<Form.Item label="Datas" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
					
							<RangePicker 
								defaultValue={formataData()}
								size='large'
								locale={locale} 
								onChange={(datas) => {
									const datasFormatadas = datas?.map((dateDayJs) => {
										
										return dateDayJs?.toISOString().substring(0,10);
									});								
									
									setDatas(datasFormatadas);
								}}				
							/>
						</Form.Item>
						<Form.Item>
							<Checkbox
								checked={ehProva}
								onChange={(evt) => setEhProva(evt.target.checked)}
							>
							Problema de Prova
							</Checkbox>
						</Form.Item>
					</Form.Item>
				

					<Form.Item label="Descrição">
						<Input 
							size='large' 
							value={descricao}
							onChange={(evt) => setDescricao(evt.target.value)}
						/>
					</Form.Item>
				
					<Divider/>
				
					<Form.Item label="Adicionar Problemas">
						<Select
							mode='multiple'
							size='large'
							value={problemasTarefa}
							onChange={(value,problema) =>setProblemasTarefa(problema)}							
							options={options}
						/>
					</Form.Item>
					<ListaProblemas>
					
						<strong><p>Problemas Adicionados</p></strong>
						<ProblemasAdicionados>
							{problemasTarefa?.map((problem, idx) => (
						
								<p key={idx}>{problem.label}</p>
					
							))}
						</ProblemasAdicionados>
					
					
					</ListaProblemas>
					<Divider/>
					<p>Importar Atividade</p>
					<Form.Item label="Turma">
						<Select
							size='large'
						
							onChange={(value,turma) => {tarefasPorTurma(value);}}							
							options={optionsTurma}
						/>
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						<Form.Item label="Roteiros" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
							<Select
								size='large'
								value={roteiroPorTurma}
								onChange={(value, label) => setRoteirosPorTurma(label)}							
								options={optionsRoteiros}
								allowClear
							/>
							<ListaProblemas>
								{problemasPorRoteiro?.length === 0 ? null : (
									<>
										<h3>Roteiros por Tarefa</h3>
										{problemasPorRoteiro?.map((problema: Problema,idx) => (
											<ProblemaRow key={`${problema.id}-${idx}`}>
												<ProblemaInfo>
													<p>{problema.nome}</p>
												</ProblemaInfo>

												<ProblemaActions>
								
													<Button size='large' onClick={() => { const idDeletado = problema.id;
														const problemasAtuais = problemasPorRoteiro.filter(({ id }) => id !== idDeletado);
														setProblemasPorRoteiro(problemasAtuais);}}>
														<DeleteOutlined />
													</Button>
												</ProblemaActions>
											</ProblemaRow>
										)
										)}
									</>
								)}
						
					
					
							</ListaProblemas>
						</Form.Item>
						<Form.Item label="Provas" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
							<Select
								size='large'
								value={provasPorTurma}
								onChange={(value,label) => {setProvasPorTurma(label); problemaPorProva(value);}}							
								options={optionsProvas}
								allowClear
							/>
							<ListaProblemas>
					
								{problemasPorProva?.length === 0 ? null : (
									<>
										<h3>Provas por Tarefa</h3>
										{problemasPorProva?.map((problema: Problema,idx) => (
											<ProblemaRow key={`${problema.id}-${idx}`}>
												<ProblemaInfo>
							
													<p>{problema.nome}</p>
												</ProblemaInfo>

												<ProblemaActions>
							
													<Button size='large'
														onClick={()=>{ const idDeletado = problema.id;
															const problemasAtuais = problemasPorProva.filter(({ id }) => id !== idDeletado);
															setProblemasPorProva(problemasAtuais);} }>
														<DeleteOutlined />
													</Button>
												</ProblemaActions>
											</ProblemaRow>
										)
										)}
									</>
								) 
								}
				
				
							</ListaProblemas>
						</Form.Item>
					
					</Form.Item>
					<Divider/>
				
					<Form.Item>
						<Button size='large' type="primary" 
							htmlType="submit" style={{float: 'right'}}>
							{actionType === 'CREATE' ? 'Criar Tarefa' : 'Editar Tarefa'}
						</Button>
						<Link to={actionType==='UPDATE'?`/tarefa/${id}/${turmaId}`: `/turma/${turmaId}`}>
							<Button 
								style={{float: 'right', marginRight: '5px'}} 
								size='large' >
							Cancelar
							</Button></Link>
					</Form.Item>
				
				</Form>}
			</TurmaNovaContainer>
		</>
	);
}

export { TarefaNova };