import { DownOutlined } from '@ant-design/icons';
import { Space, Tag, Tabs, Dropdown, Spin } from 'antd';
import { isUndefined } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import CasosDeTesteService from '../../services/CasosDeTesteService';
import ProblemaService from '../../services/ProblemaService';
import { ICasosDeTeste } from '../../types/CasosDeTeste';
import { Problema as IProblema } from '../../types/Problema';
import { CasosDeTeste } from './CasosDeTeste';
import { Descricao } from './Descricao';
import { Editar } from './Editar';
import { EnviarResposta } from './EnviarResposta';
import { CriadorContainer, 
	HeaderContainer, 
	HeaderInfo, 
	HeaderTitle, 
	ProblemaContainer, 
	ProblemaInfo, 
	FotoPerfil,
	ProblemaWrapper
} from './styles';
import { Submissoes } from './Submissao';

export interface ProblemaTabProps {
	problemaId?: number;
	problema?: IProblema;
	casosTeste?: ICasosDeTeste[];
}

function Problema() {
	const [problema, setProblema] = useState<IProblema>({} as IProblema);
	const [casosTeste, setCasosTeste] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);

	const [isCasoDeTeste, setIsCasoDeTeste] = useState(true);

	const { id } = useParams();
	const numericId = Number(id);

	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	const itemsDropDown = [
		{
			key: '1',
			label: <span onClick={() => setIsCasoDeTeste(false)}>Problema</span>,
		},
		{
			key: '2',
			label: <span onClick={() => setIsCasoDeTeste(true)}>Casos de teste</span>,
		},
	];	

	const allItems = [
		{
			key: '1',
			label: 'Descrição',
			children: <Descricao problema={problema} casosTeste={casosTeste} />,
		},
		{
			key: '2',
			label: 'Enviar Resposta',
			children: <EnviarResposta problemaId={numericId} />,
		},
		{
			key: '3',
			label: 'Submissões',
			children: <Submissoes problemaId={numericId} />,
		},
		{
			key: '4',
			label: (
				<Dropdown menu={{ items: itemsDropDown }}>
					<Space>
						Editar
						<DownOutlined />
					</Space>
				</Dropdown>
			),
			children: isCasoDeTeste
				? <CasosDeTeste casosTeste={casosTeste} problemaId={numericId} />
				: <Editar problema={problema} />,
		},
	];
	
	



	useEffect(() => {
		async function loadProblema() {
			if (Number.isNaN(numericId)) {
				alert('O id passado não é um número');
				return;
			}

			const { data: problema } = await ProblemaService.findById(numericId);
			setProblema(problema);

			if (user === null) {
				setItems(allItems.filter(item => item.key === '1'));
			}
			else if (!user.ehProfessor) {
				setItems(allItems.filter(item => item.key !== '4'));
			}
			else if (user.ehProfessor && user.id === problema.criadorId) {
				setItems(allItems);
			}
			else {
				setItems(allItems.filter(item => item.key === '1'));
			}

			const { data: casosTeste } = await CasosDeTesteService.findByProblema(numericId);
			setCasosTeste(casosTeste);
			
			setIsLoading(false);
		}		
		
		document.title = 'Problema';
		loadProblema();
	}, []);
	

	return (
		<>
			<NavBar />
			<ProblemaContainer>
				{isLoading ? <Spin /> : (
					<HeaderContainer>
						<HeaderInfo>Nível {problema?.dificuldade} | Tempo limite base: 1 segundo | Limite de memória 200MB</HeaderInfo>

						<Divider />
						
						<ProblemaWrapper>
							<ProblemaInfo>
								<HeaderTitle>{problema?.nome}</HeaderTitle>
								<Space size={[0, 8]} wrap style={{marginLeft: 16}}>
									{problema.topicos.map(topico => (
										<Tag key={`topico-${topico.id}`}>{topico.nome}</Tag>
									))}
								</Space>
							</ProblemaInfo>

							<CriadorContainer>
								<FotoPerfil /> <span>{problema?.autor}</span>
							</CriadorContainer>
						</ProblemaWrapper>

						<Tabs 
							size='large'
							centered
							defaultActiveKey="1" 
							items={allItems} 
							style={{margin: 16, display: 'block'}}
							destroyInactiveTabPane={true}
						/>
					</HeaderContainer>
				)}
				
			</ProblemaContainer>
		</>
	);
}

export { Problema };