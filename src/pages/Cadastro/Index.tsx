import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ActionsRegistro, CadastroContainer, ChamadaContainer, ChamadaImage, ChamadaTexto, ContainerRegistro } from './styles';
import BannerLogin from '../../assets/icons/BannerLogin';
import { Button, Form, Input } from 'antd';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import UsuarioService from '../../services/UsuarioService';

interface Usuario {
	id?: number;
	ehAdm?: boolean;
	ehProfessor?: boolean;
	email: string;
	nome: string;
	usuario: string;
	senha: string;
	instituicaoAtualId?: number;
}

export default function Cadastro() {
	const [email, setEmail] = useState('');
	const [nome, setNome] = useState('');
	const [usuario, setUsuario] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

	const navigate = useNavigate();

	function handleOnFinish() {
		if (senha !== confirmacaoSenha) {
			console.log('Senha errada');
			return;
		} 
		
		const usuarioPayload: Usuario = {
			email,
			nome,
			usuario,
			senha,
		};

		api.post('/usuario', usuarioPayload)
			.then(response => {
				if (response.status === 201) {
					toast.success('Usuário criado com sucesso');
					navigate('/login');
				}
			})
			.catch((err : AxiosError) => {
				toast.error(`Não foi possível criar usuário ${err.message}`);
			});
	}

	function handleOnFinishFailed() {
		toast.warning('Não foi possível criar usuário pois houve erro nos dados');
		UsuarioService.findByInstituicao(1).then(response => console.log(response));
	}

	return (
		<>
			<NavBar />
			<CadastroContainer>
				<ChamadaContainer>
					<ChamadaImage>
						<BannerLogin />
					</ChamadaImage>

					<ChamadaTexto>
						<strong>Comece sua jornada conosco </strong>
						e entenda de uma vez por todas os conceitos da programação e se desafie cada vez mais, com nossa lista de problemas</ChamadaTexto>
				</ChamadaContainer>

				<ContainerRegistro>
					<h2>Registrar</h2>

					<ActionsRegistro></ActionsRegistro>
					
					<Form
						name="basic"
						layout='vertical'
						initialValues={{ remember: true }}
						onFinish={handleOnFinish}
						onFinishFailed={handleOnFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label='Email'
							name='email'
							rules={[{required: true, message: 'Por favor digite o seu e-mail!'}]}
						>
							<Input 
								size='large'
								type='email'
								value={email}
								onChange={(evt) => setEmail(evt.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Nome'
							name='nome'
							rules={[{required: true, message: 'Por favor digite o nome!'}]}
						>
							<Input 
								size='large'
								value={nome}
								onChange={(evt) => setNome(evt.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Usuario'
							name='usuario'
							rules={[{required: true, message: 'Por favor digite o usuario!'}]}
						>
							<Input 
								size='large'
								value={usuario}
								onChange={(evt) => setUsuario(evt.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Senha'
							name='senha'
							rules={[{required: true, message: 'Por favor digite o usuario!'}]}
						>
							<Input 
								size='large'
								type='password'
								value={senha}
								onChange={(evt) => setSenha(evt.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Confirmar Senha'
							name='confirmar_senha'
							rules={[{required: true, message: 'Por favor digite o usuario!'}]}
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
								style={{width: '100%'}} 
								size='large' type="primary" 
								htmlType="submit"
							>
								Criar nova conta
							</Button>
						</Form.Item>
					</Form>

					<p>
						Já possui uma conta? <Link to='/login'>Faça login.</Link>
					</p>
				</ContainerRegistro>
			</CadastroContainer>
		</>
	);
}