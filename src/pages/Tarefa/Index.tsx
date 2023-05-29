
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
import { EditOutlined, FilterOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import ProblemaService from '../../services/ProblemaService';
import { Problema } from '../../types/Problema';
import { FailIcon } from '../../assets/icons/FailIcon';
import { decrypt } from '../../utils/crypto';
import { CorrectIcon } from '../../assets/icons/CorrectIcon';


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

export default function TarefaProblemas() {
	const {turmaId} = useParams();
	const { id } = useParams();
	const [tarefa, setTarefa] = useState<Tarefa>();
	const [statusTarefa, setStatusTarefa] = useState('');
	const [turma, setTurma] = useState<Turma>();
	const navigate = useNavigate();
	const [problemas, setProblemas] = useState<Problema[]>([]);
	const [searchText, setSearchText] = useState('');

	const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));

	const problemasFiltradosToColumns = problemas
		.filter(problema => problema.nome.toLowerCase().includes(searchText.toLowerCase().trim()))
		.map(problema => {
			
			return {
				...problema,
				key: problema.id,
				resolvido: problema.status === 'OK'
				? <CorrectIcon size={32} />
				: <FailIcon size={32} />, 
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

	function handleEditarTarefa(actionType: string, tarefa: Tarefa) {
		navigate('editar', {
			state: {
				actionType,
				tarefaAtual: tarefa
			}
		});
	}

	useEffect(()=> {
		if(id !== undefined){
			findTask(id);
			
		}
		
		async function buscaProblemas() {
			const { data: problemasResponse } = await ProblemaService.findByTarefaAndUsuario(id, user.id);
			setProblemas(problemasResponse);
		}
		buscaProblemas();
		
		
		
	},[id]);

	async function findTask(id:number) {


		const response = await TarefaService.findById(id);
		
		setTarefa(response.data);
		const { data } = await TurmaService.findById(response.data.turmaId);
		setTurma(data);

		const { data: statusTarefa } = await TarefaService.statusTarefa(id, user.id);
		setStatusTarefa(statusTarefa);
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
						{!!turma?.professores.filter(professor => professor.id === user.id).length && <Button size='large' style={{float: 'right'	}} onClick={() => handleEditarTarefa('UPDATE', tarefa)} >
							<EditOutlined />
						</Button>}
						<p>
							<strong>Status: </strong> {statusTarefa}
						</p>
						<p>
							<strong>Encerra em: </strong> {tarefa?.dtEncerramento}
						</p>
						

						
						
					</DescriptionRight>
				</DescriptionContainer> 
				<SearchRow>
					<Input 
						size='large' 
						placeholder='Digite o nome do problema que está procurando...' 
						value={searchText}
						onChange={(evt) => setSearchText(evt.target.value)}
					/>

					<Button size='large' >
						<FilterOutlined />
					</Button>
				</SearchRow>
				<Table 
					style={{ margin: 16 }} 
					columns={columns} 
					dataSource={problemasFiltradosToColumns}
					pagination={false}
				/>
			</TarefaContainer>
		</>);
}


