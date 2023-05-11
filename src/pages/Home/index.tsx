import { useEffect, useState } from 'react';
import { AreaAtividades, BannerBemVindo, BannerInfo, BemVindoUser, HomeContainer, InfoSobreSistema, MensagemBemVindo, MensagemInfo, TarefaRow } from './styles';
import { NavBar } from '../../components/NavBar';

import BannerImgBemVindo from '../../assets/icons/BannerImgBemVindo';
import BannerImgInfoSistema from '../../assets/icons/BannerImgInfoSistema';
import GithubIcon from '../../assets/icons/GithubIcon';
import { Link } from 'react-router-dom';
import { Tarefa } from '../../types/Tarefa';
import TarefaService from '../../services/TarefaService';
import { Clipboard, Exam } from '@phosphor-icons/react';
import { Usuario } from '../../types/Usuario';
import { Divider } from '../../components/Divider';
import { decrypt } from '../../utils/crypto';

export const Home = () => {
	const [roteiros, setRoteiros] = useState<Tarefa[]>([]);
	const [provas, setProvas] = useState<Tarefa[]>([]);
	const [usuario, setUsuario] = useState<Usuario[]>([]);
	useEffect(() => {

		async function loadTarefas() {
			const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));
			
			if (!user) return;
			setUsuario(user);



			const { data: tarefasData } = await TarefaService.findByAluno(user.id);
			console.log(tarefasData);
			setRoteiros(tarefasData.roteiros);
			setProvas(tarefasData.provas);
			
		}

		document.title = 'Home';
		loadTarefas();
	}, []);

	return (
		<>
			<NavBar></NavBar>
			<HomeContainer>
				<BemVindoUser>
					<MensagemBemVindo>
						<p className='titulo'>Bem vindo de volta, <strong>{usuario.nome}!</strong></p>
						<p>Resolva exercícios de codificação e seja orientado para obter  conhecimento nas linguagens de programação escolhidas</p>
					</MensagemBemVindo>
					<BannerBemVindo>
						<BannerImgBemVindo/>
					</BannerBemVindo>
					
				</BemVindoUser>
				<Divider/>
				<InfoSobreSistema>
					<BannerInfo>
						<BannerImgInfoSistema/>
					</BannerInfo>
					<MensagemInfo>
						<p className='titulo'>Conheça o <strong>Code2know</strong></p>
						<p>O <strong>Code2know</strong> é um sistema criado focado no ensino de programação para iniciantes e com foco no feedback rápido para que o usuário possa progredir com mais facilidade</p>
						<p>Conheça melhor nosso projeto atraves do github <a href='https://github.com/jpalvesl/tcc'><GithubIcon/></a></p>
					</MensagemInfo>

				</InfoSobreSistema>
				<Divider/>
				
				<AreaAtividades>
					<h3>Atividades em aberto</h3>
					<p className='titulo'>Provas em Aberto</p>
					{provas.map((roteiro, idx) => (
						<TarefaRow key={idx}>
							
							<Link to={`/tarefa/${roteiro.id}`}>
								<p className='atividades'><Exam size={16} style={{paddingRight: '10px'}}/>{roteiro.titulo}</p>
							</Link>
						</TarefaRow>
						
						
					))}
					<p className='titulo'>Roteiros em Aberto</p>
					{roteiros.map((roteiro, idx) => (
						<TarefaRow key={idx}>
							
							<Link to={`/tarefa/${roteiro.id}`}>
								<p className='atividades'> <Clipboard size={16} style={{paddingRight: '10px'}}/>{roteiro.titulo}</p>
							</Link>
						</TarefaRow>
							
							
					))}
				</AreaAtividades>
			</HomeContainer>
			
		</>

		
	);
};