import { useEffect } from 'react';
import { NavBar } from '../../components/NavBar';
import { SobreContainer } from './styles';

export default function Sobre(){
	useEffect(() => {
		document.title = 'Sobre';
	}, []);
	
	return (
		<>
			<NavBar></NavBar>
			<SobreContainer>
				<h2> Sobre </h2>
				<p className='titulo'><strong>Como surgiu a ideia do projeto</strong></p>
				<p className='texto'>A ideia inicial do Projeto veio do nosso orientador que viu que alguns sistemas usados para auxilio no ensino de programação atendiam a demando, porém cada um com suas especificidades, alguns deles com uma interface nada intuitiva e com funcionalidades que poderiam ser melhores exploradas, então a partir dessa ideia inicial resolvemos desenvolver essa plataforma para atender principalmente as pessoas com foco na aprendizagem de programação através de um feedback rápido e algumas outras funcionalidades que foram discutidas, mas ficaram de fora do escopo inicial do projeto, visto que tivemos que definir o que poderia ser entregue já que temos 1 período para o planejamento e um período para a implementação de fato do MVP do projeto.</p>
				<hr></hr>
				<p className='titulo'><strong>Escopo definido para o projeto</strong></p>
				<p className='texto'>No nosso Sitemap inicial foi definido que serão entregues 25 telas, foi feita uma análise de mercado verificando os sistemas que tínhamos presentes já no mercado para que possamos ver o que faz sentido para nosso sistema e o que teremos que melhorar </p>
				<hr></hr>
				<p className='titulo'><strong>Tecnologias usadas no projeto</strong></p>
				<ul>
					<li>Spring Boot</li>
					<li>React</li>
					<li>Mariadb</li>
					<li>Docker</li>
				</ul>
			</SobreContainer>

		</>
	);
}