import { ClipboardText, Exam, UsersThree } from '@phosphor-icons/react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import LandingPageIcon from '../../assets/icons/LadingPageIcon';
import { Divider } from '../../components/Divider';

import { NavBar } from '../../components/NavBar';
import { themes } from '../../styles/themes';
import { LandingPageContainer, LeftSide, WellcomeContainer } from './styles';

function LandingPage() {
	return (
		<>
			<NavBar />
			<LandingPageContainer>
				<WellcomeContainer>
					<LeftSide>
						<h1>Seja realmente bom em programação.</h1>

						<p>
              Desenvolva fluência em 61 linguagens de programação com nossa combinação única de aprendizado, prática e orientação. O exercício é divertido, eficaz e 100% gratuito, para sempre.
						</p>

						<Link to='/cadastro'>
							<Button size='large'>Criar conta</Button>
						</Link>
					</LeftSide>
          
					<LandingPageIcon />
				</WellcomeContainer>
				
				<Divider />

				<VerticalTimeline>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{ background: themes.default.gray['800'], color: '#fff' }}
						contentArrowStyle={{ borderRight: `7px solid  ${themes.default.gray['800']}` }}
						date="2023"
						dateClassName='date'
						iconStyle={{ background: themes.default.gray['800'], color: '#fff' }}
						icon={<ClipboardText size={32} />}
					>
						<h3 className="vertical-timeline-element-title">Resolva problemas</h3>
						<p>
              O Code2Know possui uma base com mais de 1000 problemas para você resolver. Você pode achar facilmente problemas de seu interesse pelo nível de dificuldade e tópicos como: String, Array, Grafo, dentre muitos outros.
						</p>
						<p>
							<Link to='/problema'>Resolva nossos problemas agora</Link>.
						</p>
						<img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png" alt="" />
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{ background: themes.default.gray['800'], color: '#fff' }}
						contentArrowStyle={{ borderRight: `7px solid  ${themes.default.gray['800']}` }}
						date="2023"
						dateClassName='date'
						iconStyle={{ background: themes.default.gray['800'], color: '#fff' }}
						icon={<UsersThree size={32} />}
					>
						<h3 className="vertical-timeline-element-title">Crie Turmas</h3>
						<p>
              Crie turmas de estudos e classes para alunos. A turma facilita a gestão de provas e tarefas para os estudantes além de avaliar automaticamente o desempenho de cada um.
						</p>
						<img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png" alt="" />
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{ background: themes.default.gray['800'], color: '#fff' }}
						contentArrowStyle={{ borderRight: `7px solid  ${themes.default.gray['800']}` }}
						date="2023"
						dateClassName='date'
						iconStyle={{ background: themes.default.gray['800'], color: '#fff' }}
						icon={<Exam size={32} />}
					>
						<h3 className="vertical-timeline-element-title">Aplique provas e tarefas</h3>
						<p>
              Faça suas provas no The Huxley ou mantenha a sua turma praticando através de tarefas. Escolha as questões, diga quantos pontos cada uma vale, defina o início e o fim da tarefa e pronto! O The Huxley vai calcular automaticamente as notas dos seus alunos de acordo com os acertos de cada um.
						</p>
						<img 
							src="https://media.discordapp.net/attachments/778615078244319252/1100143949756235877/Captura_de_tela_de_2023-04-24_16-38-54.png" 
							alt="" 
							style={{ marginTop: 8, width: 450 }}
						/>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</LandingPageContainer>
		</>
	);
}

export { LandingPage };