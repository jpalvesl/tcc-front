import { Link } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ActionsLogin, LoginContainer, ChamadaContainer, ChamadaImage, ChamadaTexto, ContainerRegistro} from './styles';
import BannerLogin from '../../assets/icons/BannerLogin';
import { Button, Form, Input } from 'antd';


export default function Login() {
	return (
		<>
			<NavBar></NavBar>
			<LoginContainer>
				<ChamadaContainer>
					<ChamadaImage>
						<BannerLogin />
					</ChamadaImage>

					<ChamadaTexto>
						<strong>Comece sua jornada conosco </strong>
						e entenda de uma vez por todas os conceitos da programação e se desafie cada vez mais, com nossa lista de problemas</ChamadaTexto>
				</ChamadaContainer>

				<ContainerRegistro>
					<h2>Login</h2>

					<ActionsLogin></ActionsLogin>
					<h2>Registrar</h2>

					
					
					<Form
						name="basic"
						layout='vertical'
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={() => {console.log('oi');}}
						onFinishFailed={() => {console.log('cu');}}
						autoComplete="off"
					>
						<Form.Item
							label='Usuário ou email'
							name='user-email'
							rules={[{required: true, message: 'Por favor digite o seu usuário ou e-mail!'}]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label='Senha'
							name='senha'
							rules={[{required: true, message: 'Por favor digite sua senha!'}]}
						>
							<Input />
						</Form.Item>

						

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Entrar
							</Button>
						</Form.Item>
					</Form>
					<button />

					<p>
					Não tem uma conta ainda? <Link to='/cadastro'>Inscreva-se gratuitamente.</Link>
					</p>
				</ContainerRegistro>
			</LoginContainer>
			
		</>
	);
}