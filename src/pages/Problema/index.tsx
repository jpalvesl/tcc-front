import { DownOutlined } from '@ant-design/icons';
import { Space, Tag, Tabs, Dropdown, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import CasosDeTesteService from '../../services/CasosDeTesteService';
import ProblemaService from '../../services/ProblemaService';
import { Problema as IProblema } from '../../types/Problema';
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

const tags = [
	{
		id: 1,
		nome: 'String'
	},
	{
		id: 2,
		nome: 'Lista'
	},
	{
		id: 1,
		nome: 'Teste'
	},
];

const itemsDropDown = [
	{
		key: '1',
		label: 'Problema',
	},
	{
		key: '2',
		label: 'Casos de teste',
	},
];


const onChange = (key: string) => {
	console.log(key);
};



function Problema() {
	const [problema, setProblema] = useState<IProblema>({} as IProblema);
	const [casosTeste, setCasosTeste] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	const items = [
		{
			key: '1',
			label: 'Descrição',
			children: <Descricao problema={problema} casosTeste={casosTeste} />,
		},
		{
			key: '2',
			label: 'Enviar Resposta',
			children: <EnviarResposta />,
		},
		{
			key: '3',
			label: 'Submissões',
			children: <Submissoes />,
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
			children: <Editar />,
		},
	];
	

	useEffect(() => {
		async function loadProblema() {
			const numberId = Number(id);
			if (Number.isNaN(numberId)) {
				alert('O id passado não é um número');
				return;
			}


			const { data: problema } = await ProblemaService.findById(numberId);
			setProblema(problema);

			const { data: casosTeste } = await CasosDeTesteService.findByProblema(numberId);
			setCasosTeste(casosTeste);
			
			setIsLoading(false);
		}		
		
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
									{tags.map(tag => (
										<Tag key={`tag-${tag.id}`}>{tag.nome}</Tag>
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
							items={items} 
							onChange={onChange} 
							style={{margin: 16, display: 'block'}}
						/>
					</HeaderContainer>
				)}
				
			</ProblemaContainer>
		</>
	);
}

export { Problema };