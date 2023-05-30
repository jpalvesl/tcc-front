import { useEffect, useState } from 'react';
import { NavBar } from '../../components/NavBar';
import { CampoContato, CampoForm, CampoInfo, ContatoContainer } from './styles';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

const steps = [
	{
		disableBeacon: true,
		floaterProps: {
			disableAnimation: true,
		},
		spotlightPadding: 20,
		placement: 'center',
		target: 'body',
		content: <h2>Bem-vindo a Tela de Contato!</h2>,
	},
	{
		
		floaterProps: {
			disableAnimation: true,
		},
		spotlightPadding: 20,
		target: '.assunto',
		content: 'Insira o assunto'
	},
	{
		floaterProps: {
			disableAnimation: true,
		},
		spotlightPadding: 20,
		target: '.mensagem',
		content: 'Insira aqui sua mensagem. Lembre-se de deixar o seu email no corpo da mensagem caso deseje requisitar permissão de adm.'
	},
];

export default function Contato(){

	const [run, setRun] = useState(false);

	useEffect(() => {
		const tour = localStorage.getItem('fez_tour_contato');

		if (tour == null){
			setRun(true);
		}

		document.title = 'Contato';
	}, []);

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { status, type } = data;
		if (status == STATUS.FINISHED){
			localStorage.setItem('fez_tour_contato','fez');
		}
		const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

		if (finishedStatuses.includes(status)) {
			setRun(false);
		}

		
	};

	return (
		<>
			<NavBar></NavBar>
			<Joyride
				callback={handleJoyrideCallback}
				run={run}
				styles={{
					options: {
						zIndex: 10000,
					},
				}} 
				continuous
				hideCloseButton
				scrollToFirstStep
				showProgress
				showSkipButton
				locale={{back: 'voltar', close: 'fechar', next: 'próximo', last: 'fechar', skip: 'pular'}}
				steps={steps}/>
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
							<input className='assunto' type="text" name="name" id="name" required />
							<label htmlFor="message">Mensagem</label>
							<textarea className='mensagem' name="message" id="message" required></textarea>
							<input  type="hidden" name="_captcha" value="false" />
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