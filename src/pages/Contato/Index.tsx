import { NavBar } from '../../components/NavBar';
import { CampoContato, CampoInfo, ContatoContainer } from './styles';


export default function Contato(){
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
					

				</CampoContato>
			</ContatoContainer>

		</>
	);
}