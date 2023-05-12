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
formulário abaixo ou envie um e-mail para code2knoww@gmail.com</p>
						
					</CampoInfo>

					<CampoForm>
						<form
							action="https://formsubmit.co/code2knoww@gmail.com"
							method="POST"
							className="form"
						>
							<label htmlFor="name">Assunto</label>
							<input type="text" name="name" id="name" required />
							<label htmlFor="message">Mensagem</label>
							<textarea name="message" id="message" required></textarea>
							<input type="hidden" name="_captcha" value="false" />
							<input
								type="hidden"
								name="_next"
								value="http://localhost:5173"
							/>
							<button type="submit">Enviar</button>
						</form>
					</CampoForm>

					
					

				</CampoContato>
			</ContatoContainer>

		</>
	);
}