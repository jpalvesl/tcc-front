import { NavBar } from '../../components/NavBar';
import { CabecalhoPerfil, CampoFoto, CampoInfo, ContainerTabs, ConteudoPerfil, PerfilContainer } from './styles';

import { Usuario } from '../../types/Usuario';
import { useEffect, useState } from 'react';


import UsuarioService from '../../services/UsuarioService';
import { Button, Divider, Tabs, TabsProps, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Turma } from '../../types/Turma';
import TurmaService from '../../services/TurmaService';
import { Link, useNavigate } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { Problema } from '../../types/Problema';
import ProblemaService from '../../services/ProblemaService';
import { FailIcon } from '../../assets/icons/FailIcon';
import SubmissaoService from '../../services/SubmissaoService';






export default function Perfil(){
	
	const navigate = useNavigate();
	const [usuario, setUsuario] = useState<Usuario>();



	const [turmas, setTurmas] = useState<Array<Turma>>([]);

	const [problemas, setProblemas] = useState<Problema[]>([]);

	const [submissoes, setSubmissoes] = useState([]);
	const [mapProblemas, setMapProblemas] = useState({ tentados: [], resolvidos: [] });

	interface DataType {
		key: string;
		name: string;
		age: number;
		address: string;
		tags: string[];
	}

	const columns: ColumnsType<DataType> = [
		{
			title: 'Dificuldade',
			dataIndex: 'dificuldade',
			key: 'dificuldade',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Titulo',
			dataIndex: 'titulo',
			key: 'titulo',
		},
		{
			title: 'Resolvido',
			dataIndex: 'resolvido',
			key: 'resolvido',
		}
	];

	function editTask(id: number){
		navigate(`/perfil/${id}`);
	}
	
	useEffect(() => {
		async function loadUsuario() {
			const user = JSON.parse(localStorage.getItem('@Auth:user'));

			if (!user) return;

			const { data } = await UsuarioService.findById(user.id);
			const { data: dataTurma} = await TurmaService.findByUsuario(user.id);
			const { data: dataProblema} = await ProblemaService.findProblemasTentados(user.id);
			const { data: dataSubmissao } = await SubmissaoService.findByUsuario(user.id);
			const { data: mapProblemasData } = await ProblemaService.findProblemasTentadosERespondidos(user.id);

			setUsuario(data);
			setTurmas(dataTurma.aluno);
			setProblemas(dataProblema);
			setSubmissoes(dataSubmissao);
			setMapProblemas(mapProblemasData);
		}
		document.title = 'Perfil';

		loadUsuario();
	}, []);
	
	const onChange = (key: string) => {
		console.log(key);
	};

	const problemasFiltradosToColumns = problemas.map(problema => {
		return {
			...problema,
			key: problema.id,
			resolvido: <FailIcon size={32} />, // Verificar como devemos fazer para mostrar o problema feito
			titulo: (
				<Link 
					to={`/problema/${problema.id}`}
					style={{ fontWeight: 'bold' }}
				>
					{problema.nome}
				</Link>
			)
		};

	});
	
	const items: TabsProps['items'] = [
		
		{
			key: '1',
			label: <p className='label-titulo'>Status dos problemas</p>,
			children: <Table columns={columns} dataSource={problemasFiltradosToColumns}/>
		},
		{
			key: '2',
			label: <p className='label-titulo'>Turmas</p>,
			children:  <p> <h3 className='titulo'>Minhas Turmas</h3><Divider/>{turmas?.map((turma, idx) => (
				
				<div key={turma.id}>
					<p className='turmasAluno' key={idx}>{turma.nomeTurma} - {turma.semestre}</p>
					<p className='instituicaoTitulo'>{turma.instituicaoTitulo}</p>
				</div>
				
						
			))}</p>
			
		}
		
	];
		
	return (
		<>
			<NavBar></NavBar>
			<PerfilContainer>
				<h2>Perfil</h2>
				<Divider/>
				
				<CabecalhoPerfil>
					
					<CampoFoto>
						<div className='imagem'>
							
							<img src={usuario?.imagemUrl} alt="Imagem" />
						</div>
					</CampoFoto>
					<CampoInfo>
						<Button size='large' style={{float: 'right', margin: '10px 20px 0px 0px'}} onClick={()=> editTask(usuario?.id)}>
							<EditOutlined />
						</Button>
						<p className='nomeUsuario'>
							<strong>{usuario?.nome}</strong>
							
							
							
						</p>
						<p className='instituicao'>
							Instituto Federal da Paraíba
						</p>
						<p className='problemas'>
							Submissões: {submissoes.length}
						</p>
						<p className='problemas'>
							Problemas tentados: {mapProblemas.tentados}
						</p>
						<p className='problemas'>
							Problemas resolvidos: {mapProblemas.resolvidos}
						</p>
						

					</CampoInfo>

				</CabecalhoPerfil>
				<ConteudoPerfil>
					<ContainerTabs><Tabs defaultActiveKey="1" items={items} onChange={onChange} size='large' style={{width: '1000px'}}/>
					</ContainerTabs>
				</ConteudoPerfil>
			</PerfilContainer>
		</>
	);
}