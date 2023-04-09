import locale from 'antd/es/date-picker/locale/pt_BR';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Divider } from '../../components/Divider';

import { ListaProblemas, TurmaNovaContainer } from './styles';
import { NavBar } from '../../components/NavBar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Tarefa } from '../../types/Tarefa';
import TarefaService from '../../services/TarefaService';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

function TarefaNova() {
	const { id } = useParams();
	const [titulo, setTitulo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [problema, setProblema] = useState([]);
	const [datas, setDatas] = useState([]);

	useEffect(()=> {
		if(id !== undefined){
			findTask(id);
			
		}
		
		
	},[id]);

	async function findTask(id:number) {
		const {data} = await TarefaService.findById(id);
		const dates = [data.dtEncerramento, data.dtAbertura];
		console.log('dates',dates);

	
		
		setTitulo(data.titulo);
		setDescricao(data.descricao);
		setDatas(dates);
		console.log(datas);
		
		
	}

	async function handleOnFinish(criadorId: number) {
		console.log(datas);
		const tarefa: Tarefa = {

			dtAbertura: datas[0],
			dtEncerramento: datas[1],
			descricao: descricao,
			titulo: titulo,
			criadorId: criadorId,
			turmaId: '1',
		};
		console.log('tarefa',tarefa);
		if (id !== undefined) {
			TarefaService.edit(tarefa, criadorId);
			console.log('editou');
		}
		else{
			TarefaService.add(tarefa).then(() => toast('Tarefa Criada com sucesso.')).catch(() => toast('Erro ao criar tarefa'));
			console.log('criou');

		}
	}
	
	return (
		<>
			<NavBar />    
			<TurmaNovaContainer>
				<h1>Criar Tarefa</h1>
				<Divider />
				<Form 
					layout='vertical'
					onFinish={() => handleOnFinish(50003)}
				>
					<Form.Item label="Titulo">
						<Input 
							size='large' 
							value={titulo}
							onChange={(evt) => setTitulo(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item label="Descrição">
						<Input 
							size='large' 
							value={descricao}
							onChange={(evt) => setDescricao(evt.target.value)}
						/>
					</Form.Item>
					<Form.Item label="Datas">
					
						<RangePicker 
							defaultValue={[dayjs(datas[0],'YYYY-MM-DD'),dayjs(datas[1],'YYYY-MM-DD')]}
							size='large'
							locale={locale} 
							onChange={(datas) => {
								console.log('datinha',datas);
								const datasFormatadas = datas?.map((dateDayJs) => dateDayJs?.toISOString().substring(0,10));								
								setDatas(datasFormatadas);
							}}
						/>
					</Form.Item>
					<Divider/>
					
					<h3>Adicionar Problema</h3>
					<Form.Item label="Problema">
						<Select
							mode='multiple'
							size='large'
							value={problema}
							onChange={(value) => setProblema(value)}							
							options={[{ value: '1', label: 'Problema 1' }, { value: '2', label: 'Problema 2' }]}
						/>
					</Form.Item>
					<ListaProblemas>
						<h3>Problemas Adicionados</h3>
						{problema?.map((problema, idx) => (
				
							<h3  key={idx}>{problema}</h3>
						
						))}
						
					</ListaProblemas>
					<Divider/>
					<p>Importar Atividade</p>
					<Form.Item label="Turma">
						<Select
							size='large'
							// value={professor}
							// onChange={(value) => setProfessor(value)}							
							options={[{ value: '1', label: 'João Pedro' }, { value: '2', label: 'Myrlla Lucas' }]}
						/>
					</Form.Item>
					<Form.Item label="Tarefa">
						<Select
							size='large'
							// value={professor}
							// onChange={(value) => setProfessor(value)}							
							options={[{ value: '1', label: 'João Pedro' }, { value: '2', label: 'Myrlla Lucas' }]}
						/>
					</Form.Item>

					

					<Button size='large' style={{ width: '100%' }} htmlType='submit'>
          Criar Tarefa
					</Button>
				</Form>
			</TurmaNovaContainer>
		</>
	);
}

export { TarefaNova };