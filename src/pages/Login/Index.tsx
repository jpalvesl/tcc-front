import { Link, Navigate } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { ActionsLogin, LoginContainer, ChamadaContainer, ChamadaImage, ChamadaTexto, ContainerLogin} from './styles';
import BannerLogin from '../../assets/icons/BannerLogin';
import { Button, Form, Input } from 'antd';
import { themes } from '../../styles/themes';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';



export default function Login() {

	
	const [email, setEmail] = useState('');
	
	const [senha, setSenha] = useState('');
	
	const { signIn, signed } = useContext(AuthContext);

	useEffect(() => {
		document.title = 'Login';
	}, []);

	const handleSubmit = async () => {
		const data = {
			usernameOrEmail: email,
			password: senha,
		};
		console.log('datinha',data);
		await signIn(data);
		return false;
	};

	
	
	console.log(signed);
	if(!signed) {return (
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

				<ContainerLogin>
					<h2>Login</h2>

					<ActionsLogin></ActionsLogin>
                    

                    
                    
					<Form
						name="basic"
						layout='vertical'
						initialValues={{ remember: true }}
						onFinish={handleSubmit}
						onFinishFailed={() => {console.log('ok');}}
						autoComplete="off"
					>
						<Form.Item
							label='Usuário ou email'
							name='email-user'
							rules={[{required: true, message: 'Por favor digite o seu e-mail!'}]}
						>
							<Input size='large' style={{backgroundColor: `${themes.default.slate[200]}`}} value={email} onChange={(e) => [setEmail(e.target.value)]}/>
						</Form.Item>

						<Form.Item
							label='Senha'
							name='senha'
							rules={[{required: true, message: 'Por favor digite sua senha!'}]}
						>
							<Input type='password' size='large' style={{backgroundColor: `${themes.default.slate[200]}`}} value={senha} onChange={(e) => [setSenha(e.target.value)]}/>
						</Form.Item>

                        

						<Form.Item>
							<Button 
								style={{width: '100%', backgroundColor: 'green'}} 
								size='large' type="primary" 
								htmlType="submit"
							>
                                Login
							</Button>
						</Form.Item>
					</Form>
					<p>
                    Não tem uma conta ainda? <Link to='/cadastro'>Inscreva-se gratuitamente.</Link>
					</p>
				</ContainerLogin>
			</LoginContainer>
            
		</>
	);}
	else{
		return <Navigate to="/" />;
	}
	
}