import { NavBar } from '../../components/NavBar';
import { CabecalhoPerfil, CampoFoto, CampoInfo, ContainerTabs, ConteudoPerfil, PerfilContainer } from './styles';

import { Usuario } from '../../types/Usuario';
import { useEffect, useState } from 'react';


import UsuarioService from '../../services/UsuarioService';
import { Button, Divider, Tabs, TabsProps, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Turma } from '../../types/Turma';
import TurmaService from '../../services/TurmaService';
import { useNavigate } from 'react-router-dom';
import PhotoPerfil from '../../assets/icons/PhotoPerfil';
import Table, { ColumnsType } from 'antd/es/table';






export default function Perfil(){
	
	const navigate = useNavigate();
	const [usuario, setUsuario] = useState<Usuario>();



	const [turmas, setTurmas] = useState<Array<Turma>>([]);

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

	const data: DataType[] = [
		
	];


	function editTask(id: number){
		navigate(`/perfil/${id}`);
	}

	useEffect(() => {
		async function initializeData() {
			const { data } = await TurmaService.findByUsuario(2);
			
			setTurmas(data.aluno);
			
		}

		initializeData();
	}, []);
	
	useEffect(() => {
		async function loadUsuario() {
			const { data } = await UsuarioService.findById(2);
			setUsuario(data);
			console.log(data);
		}

		loadUsuario();
	}, []);
	
	const onChange = (key: string) => {
		console.log(key);
	};

	
	const items: TabsProps['items'] = [
		
		{
			key: '1',
			label: <p className='label-titulo'>Status dos problemas</p>,
			children: <Table columns={columns} dataSource={data}/>
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
						<PhotoPerfil/>
					</CampoFoto>
					<CampoInfo>
						<Button size='large' style={{float: 'right', margin: '10px 20px 0px 0px'}} onClick={()=> editTask(usuario?.id)}>
							<EditOutlined />
						</Button>
						<p className='nomeUsuario'>
							<strong>{usuario?.nome}</strong>
							<strong>{usuario?.id}</strong>
							
							
							
						</p>
						<p className='instituicao'>
							Instituto Federal da Paraíba
						</p>
						<p className='problemas'>
							Submissões: 445
						</p>
						<p className='problemas'>
							Problemas tentados: 136
						</p>
						<p className='problemas'>
							Problemas resolvidos: 132
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