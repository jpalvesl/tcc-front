import { DownOutlined } from '@ant-design/icons';
import { Space, Tag, Tabs, Dropdown } from 'antd';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
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

const items = [
	{
		key: '1',
		label: 'Descrição',
		children: <Descricao />,
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

const onChange = (key: string) => {
	console.log(key);
};



function Problema() {
	return (
		<>
			<NavBar />
			<ProblemaContainer>
				<HeaderContainer>
					<HeaderInfo>Nível 1 | Tempo limite base: 1 segundo | Limite de memória 200MB</HeaderInfo>

					<Divider />

					<ProblemaWrapper>
						<ProblemaInfo>
							<HeaderTitle>Acidez de uma solução</HeaderTitle>
							<Space size={[0, 8]} wrap style={{marginLeft: 16}}>
								{tags.map(tag => (
									<Tag key={tag.id}>{tag.nome}</Tag>
								))}
							</Space>
						</ProblemaInfo>

						<CriadorContainer>
							<FotoPerfil /> <span>Henrique Cunha</span>
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
			</ProblemaContainer>
		</>
	);
}

export { Problema };