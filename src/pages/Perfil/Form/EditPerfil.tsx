import { Button, Form, Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PhotoPerfil from '../../../assets/icons/PhotoPerfil';

import { Divider } from '../../../components/Divider';
import { NavBar } from '../../../components/NavBar';
import UsuarioService from '../../../services/UsuarioService';
import { Usuario } from '../../../types/Usuario';
import { CampoForm, CampoImage, PerfilContainer } from './styles';



function EditarPerfil (){
	const { id } = useParams();
	const [model,setModel] = useState<Usuario>({
		nome: '',
		usuario: '',
		senha: '',
		instituicaoAtualId: 1,
		email: '',
		ehProfessor: false,
		ehAdm: false
	});
	
	useEffect(()=> {
		if(id !== undefined){
			findTask(id);
			
		}
		
		
	},[id]);

	function updateUser(e: ChangeEvent<HTMLInputElement>) {
		setModel({
			... model,
			[e.target.name]: e.target.value
		});
		
		
	}

	async function findTask(id:number) {
		const response = await UsuarioService.findById(id);
		console.log('datat',response.data);
		
		setModel( {
			id,
			nome: response.data.nome,
			usuario: response.data.usuario,
			senha: response.data.senha,
			instituicaoAtualId: 1,
			email: response.data.email,
			ehProfessor: response.data.ehProfessor,
			ehAdm: response.data.ehAdm
		});
		
		
	}

	

	

	
	async function handleOnFinish(id: number){
		console.log('id', id);
		console.log('modelzin', model);
		await UsuarioService.edit(id,model);
		const resposta = await UsuarioService.findById(id);
		
		console.log(resposta);
	}


	return(
		<>
			
			<NavBar></NavBar>
			<PerfilContainer>
				<h2>Perfil</h2>
				<Divider/>
				<div className='container'>
					<CampoImage>
						<div className='imagem'>
							<PhotoPerfil/>
						</div>
						
					</CampoImage>
					<CampoForm>
						{model.email && <Form
							name="basic"
							layout='vertical'
							initialValues={model}
							onFinish={()=> handleOnFinish(id)}
							onFinishFailed={()=>console.log('aqui')}
							
						>
							<Form.Item
								label='Email'
								name='email'
								
								rules={[{required: true, message: 'Por favor digite o seu e-mail!'}]}
							>
								
								
								<Input 
									size='large'
									type='email'
									value={model.email}
									name="email"
									onChange={(e: ChangeEvent<HTMLInputElement>)=> updateUser(e)}
									
								/>
							</Form.Item>

							<Form.Item
								label='Nome'
								name='nome'
								rules={[{required: true, message: 'Por favor digite o nome!'}]}
							>
								<Input 
									size='large'
									value={model.nome}
									name="nome"
									
								/>
							</Form.Item>

							<Form.Item
								label='Usuario'
								name='usuario'
								rules={[{required: true, message: 'Por favor digite o usuario!'}]}
							>
								<Input 
									size='large'
									value='teste'
									name="usuario"
									onChange={(e: ChangeEvent<HTMLInputElement>)=> updateUser(e)}
								/>
							</Form.Item>

							<Form.Item>
								<p><Link to={`/perfil/${id}/password`}>Alterar senha</Link></p>
							</Form.Item>

							<Form.Item>
								<Button 
									style={{float: 'right'}} 
									size='large' type="primary" 
									htmlType="submit"
								>
								Salvar
								</Button>
							</Form.Item>
						</Form>}
						
					</CampoForm>
				</div>

				
				
			</PerfilContainer>
		</>
	);
}
export {EditarPerfil};