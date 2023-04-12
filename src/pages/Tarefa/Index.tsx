
import { Divider } from '../../components/Divider';
import { 
	TarefaContainer,
	DescriptionContainer,
	DescriptionLeft,
	DescriptionRight,
	SearchRow
} from './styles';
import { Tarefa } from '../../types/Tarefa';
import { NavBar } from '../../components/NavBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TarefaService from '../../services/TarefaService';
import { Turma } from '../../types/Turma';
import TurmaService from '../../services/TurmaService';
import { Button, Input, Table } from 'antd';
import { CheckCircleOutlined, CloseCircleFilled, EditOutlined, FilterOutlined } from '@ant-design/icons';



const columnsProblemas = [
	{
		title: 'Problema',
		dataIndex: 'problema',
		key: 'problema',
	},
	{
		title: 'Dificuldade',
		dataIndex: 'dificuldade',
		key: 'dificuldade',
	},
	{
		title: 'Pontuação',
		dataIndex: 'pontuacao',
		key: 'pontuacao',
	},
	{
		title: 'Submissões',
		dataIndex: 'submissoes',
		key: 'submissoes',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
	}
];

const dataSourceProblemas = [
	{
		key: '1',
		problema:'Problema 1',
		dificuldade: '1',
		pontuacao: '16/17',
		submissoes: (<Button className='buttonSubmissao' style={{ width: '240px' }}>Visualizar submissões</Button>),
		status: <CloseCircleFilled />,
	},
	{
		key: '2',
		problema:'Problema 2',
		dificuldade: '1',
		pontuacao: '16/17',
		submissoes: (<Button className='buttonSubmissao' style={{ width: '240px' }}>Visualizar submissões</Button>),
		status: <CheckCircleOutlined />,
	},
];


export default function TarefaProblemas() {
	const { id } = useParams();
	const [tarefa, setTarefa] = useState<Tarefa>();
	const [turma, setTurma] = useState<Turma>();
	const navigate = useNavigate();

	useEffect(()=> {
		if(id !== undefined){
			findTask(id);
			
		}
		
		
	},[id]);

	async function findTask(id:number) {
		const response = await TarefaService.findById(id);
		setTarefa(response.data);
		const { data } = await TurmaService.findById(response.data.turmaId);
		setTurma(data);
	
		
	}


  

	return(
		<>
			<NavBar />    
			<TarefaContainer>
				<h1>Tarefa</h1>

				<Divider />

				<DescriptionContainer>
					<DescriptionLeft>
						<p>
							
							<strong>Titulo: </strong> {tarefa?.titulo}
							<span>Criado em: {tarefa?.dtAbertura} | Encerra em {tarefa?.dtEncerramento}</span>
						</p>
						<p>
							<strong>Descrição: </strong> {tarefa?.descricao}
              
						</p>
						<p>
							<strong>Turma: </strong> {turma?.titulo}

						</p>
						<p>
							<strong>Professor: </strong> Henrique do Nascimento Cunha
						</p>
					</DescriptionLeft>

					<DescriptionRight>
						<Link to={`/tarefas/nova/${id}`}>
							<Button size='large' style={{float: 'right'	}} >
								<EditOutlined />
							</Button>
						</Link>
						<p>
							<strong>Status: </strong> Resolvida
						</p>
						<p>
							<strong>Encerra em: </strong> {tarefa?.dtEncerramento}
						</p>
						

						
						
					</DescriptionRight>
				</DescriptionContainer>
				<SearchRow>
					<Input size='large' placeholder='Buscar problema' />

					<Button size='large' >
						<FilterOutlined />
					</Button>
				</SearchRow>
				<Table
					size='middle'
					bordered
					dataSource={dataSourceProblemas}
					columns={columnsProblemas}
					pagination={false}
				/>
			</TarefaContainer>
		</>);
}


