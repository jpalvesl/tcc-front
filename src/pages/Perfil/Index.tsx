import { NavBar } from '../../components/NavBar';
import { CabecalhoPerfil, CampoFoto, CampoInfo, ConteudoPerfil, PerfilContainer } from './styles';

import { Usuario } from '../../types/Usuario';
import { useEffect, useState } from 'react';


import UsuarioService from '../../services/UsuarioService';
import { Button, Divider, Tabs, TabsProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Turma } from '../../types/Turma';
import TurmaService from '../../services/TurmaService';
import { useNavigate } from 'react-router-dom';
import PhotoPerfil from '../../assets/icons/PhotoPerfil';






export default function Perfil(){
	
	const navigate = useNavigate();
	const [usuario, setUsuario] = useState<Usuario>();



	const [turmas, setTurmas] = useState<Array<Turma>>([]);


	function editTask(id: number){
		navigate(`/perfil/${id}`);
	}

	useEffect(() => {
		async function initializeData() {
			const { data } = await TurmaService.findByUsuario(2);
			
			setTurmas(data);
			
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
			label: 'Status dos problemas',
			children: 'Content of Tab Pane 1',
		},
		{
			key: '2',
			label: 'Turmas',
			children:  turmas?.map((turma, idx) => (
				
				<h3 className='turmasAluno' key={idx}>{turma.nomeTurma} - {turma.semestre}</h3>
						
			))
			
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
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} size='large' style={{width: '1000px'}}/>
				</ConteudoPerfil>
			</PerfilContainer>
		</>
	);
}