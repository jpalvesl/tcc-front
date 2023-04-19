import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { NavBar } from '../../components/NavBar';
import { CampoContato, CampoForm, CampoInfo, ContatoContainer } from './styles';


export default function Contato(){
	useEffect(() => {
		document.title = 'Contato';
	}, []);

	return (
		<>
			<NavBar></NavBar>
			<ContatoContainer>
				<h2> Contato </h2>
				<CampoContato>
					<CampoInfo>
						
						<p className='textInfo'>Para entrar em contato com a nossa equipe de suporte, por favor preencha o
formulário abaixo ou envie um e-mail para support@saep.com</p>
						
					</CampoInfo>

					<CampoForm>
						<Form
							name="basic"
							layout='vertical'
							initialValues={{ remember: true }}
							onFinish={() => {console.log('ok');}}
							onFinishFailed={() => {console.log('ok');}}
							autoComplete="off"
							
						>
							<Form.Item
								label='Assunto'
								name='assunto'
								rules={[{required: true, message: 'Por favor digite o assunto!'}]}
							>
								{/* Alterar tamanho da fonte do label do form */}
								<Input size='large'  />
							</Form.Item>

							<Form.Item
								label='Mensagem'
								name='mensagem'
								rules={[{required: true, message: 'Por favor digite sua mensagem!'}]}
							>
								<TextArea
									
									placeholder="Digite sua mensagem"
									autoSize={{ minRows: 10, maxRows: 10 }}
								/>
							</Form.Item>

                        

							<Form.Item>
								<Button 
									style={{float:'right', width: '25%', backgroundColor: 'green' }} 
									size='large' type="primary" 
									htmlType="submit"
								>
                                Enviar
								</Button>
							</Form.Item>
						</Form>
					</CampoForm>

					
					

				</CampoContato>
			</ContatoContainer>

		</>
	);
}