import { Button, Form, Input } from 'antd';
import {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PhotoPerfil from '../../../assets/icons/PhotoPerfil';

import { Divider } from '../../../components/Divider';
import { NavBar } from '../../../components/NavBar';
import UsuarioService from '../../../services/UsuarioService';
import { CampoForm, CampoImage, PerfilContainer } from './styles';



function AlterarSenha (){
	const { id } = useParams();
	const [senha, setSenha] = useState('');
	const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
	const [novaSenha, setNovaSenha] = useState('');
	
	useEffect(()=> {
		document.title = 'Alterar senha';
	},[id]);



	
	async function handleOnFinish(id: number){
		if(novaSenha !== confirmacaoSenha){
			toast('As senhas não correspondem');
			return;
		}

		const payload = {
			senhaAtual: senha,
			novaSenha,
		};

		try {
			await UsuarioService.editarSenha(id, payload);
			toast('Senha editada com sucesso');
		} catch (error) {
			toast('Erro ao alterar senha, tente novamente');
		}
	}

	return(
		<>
			<NavBar />
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
						<Form
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
						</Form>
						
					</CampoForm>
				</div>

				
				
			</PerfilContainer>
		</>
	);
}
export {AlterarSenha};