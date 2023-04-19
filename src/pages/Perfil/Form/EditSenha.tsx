import { Button, Form, Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhotoPerfil from '../../../assets/icons/PhotoPerfil';

import { Divider } from '../../../components/Divider';
import { NavBar } from '../../../components/NavBar';
import UsuarioService from '../../../services/UsuarioService';
import { Usuario } from '../../../types/Usuario';
import { CampoForm, CampoImage, PerfilContainer } from './styles';



function AlterarSenha (){
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
		
		document.title = 'Alterar senha';
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
								label='Senha atual'
								name='senhaAtual'
								rules={[{required: true, message: 'Por favor digite a senha atual!'}]}
							>
								<Input 
									size='large'
									type='password'
						
									onChange={()=>console.log('aq')}
								/>
							</Form.Item>

							<Form.Item
								label='Nova senha'
								name='senha'
								rules={[{required: true, message: 'Por favor digite a nova senha!'}]}
							>
								<Input 
									size='large'
									type='password'
						
									onChange={()=>console.log('aq')}
								/>
							</Form.Item>
							<Form.Item
								label='Confirmar nova senha'
								name='confirmar_senha'
								rules={[{required: true, message: 'Por favor confirme a nova senha!'}]}
							>
								<Input 
									size='large'
									type='password'
						
									onChange={()=>console.log('aq')}
								/>
							</Form.Item>

							<Form.Item>
								<Button 
									style={{width: '100%'}} 
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
export {AlterarSenha};