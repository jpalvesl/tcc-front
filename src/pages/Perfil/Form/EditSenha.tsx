import { Button, Form, Input } from 'antd';
import {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
	const [senha, setSenha] = useState('');
	const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
	const [novaSenha, setNovaSenha] = useState('');
	
	useEffect(()=> {
		if(id !== undefined){
			findTask(id);
			
		}
		
		
	},[id]);


	async function findTask(id:number) {
		const response = await UsuarioService.findById(id);
		
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
		if(senha !== model.senha){
			console.log('Senha errada');
			return;
		}
		if(novaSenha !== confirmacaoSenha){
			console.log('As senhas não correspondem');
			return;
		}
		else{
			
			model.senha = novaSenha;
			
			await UsuarioService.edit(id,model);
			
			
		}
		
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
							onFinish={()=> handleOnFinish(id)}
							onFinishFailed={()=>console.log('aqui')}
							
						>
							

							

							<Form.Item
								label='Senha atual'
								name='senha'
								rules={[{required: true, message: 'Por favor digite a senha atual!'}]}
							>
								<Input 
									size='large'
									type='password'
									value={senha}
									onChange={(evt) => setSenha(evt.target.value)}
								/>
							</Form.Item>

							<Form.Item
								label='Nova senha'
								name='novaSenha'
								rules={[{required: true, message: 'Por favor digite a nova senha!'}]}
							>
								<Input 
									size='large'
									type='password'
									value={novaSenha}
									onChange={(evt) => setNovaSenha(evt.target.value)}
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
									value={confirmacaoSenha}
									onChange={(evt) => setConfirmacaoSenha(evt.target.value)}
								/>
							</Form.Item>

							<Form.Item>
								<Button 
									style={{float: 'right'}} 
									size='large' type="primary" 
									htmlType="submit"
								>
								Salvar
								</Button>
								<Link to={`/perfil/${id}`}>
									<Button 
										style={{float: 'right', marginRight: '5px'}} 
										size='large'>
								Cancelar
									</Button></Link>
								
							</Form.Item>
							<Form.Item>
								
							</Form.Item>
						</Form>}
						
					</CampoForm>
				</div>

				
				
			</PerfilContainer>
		</>
	);
}
export {AlterarSenha};