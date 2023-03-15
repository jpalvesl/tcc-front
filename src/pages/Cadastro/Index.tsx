import { Link } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ActionsRegistro, CadastroContainer, ChamadaContainer, ChamadaImage, ChamadaTexto, ContainerRegistro } from './styles';
import BannerLogin from '../../assets/icons/BannerLogin';
import { Button, Form, Input } from 'antd';


export default function Cadastro() {
	return (
		<>
			<NavBar></NavBar>
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
						onFinish={() => {console.log('cu');}}
						onFinishFailed={() => {console.log('cu');}}
						autoComplete="off"
					>
						<Form.Item
							label='Email'
							name='email'
							rules={[{required: true, message: 'Por favor digite o seu e-mail!'}]}
						>
							<Input size='large'/>
						</Form.Item>

						<Form.Item
							label='Nome'
							name='nome'
							rules={[{required: true, message: 'Por favor digite o nome!'}]}
						>
							<Input size='large' style={{width: '100%'}}/>
						</Form.Item>

						<Form.Item
							label='Usuario'
							name='usuario'
							rules={[{required: true, message: 'Por favor digite o usuario!'}]}
						>
							<Input size='large' />
						</Form.Item>

						<Form.Item
							label='Senha'
							name='senha'
							rules={[{required: true, message: 'Por favor digite o usuario!'}]}
						>
							<Input size='large' />
						</Form.Item>

						<Form.Item
							label='Confirmar Senha'
							name='confirmar_senha'
							rules={[{required: true, message: 'Por favor digite o usuario!'}]}
						>
							<Input size='large' />
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