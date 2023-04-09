import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Col, Popover, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { NavBar } from '../../../components/NavBar';
import { Actions, Caso, CasosDeTesteCadastradosContainer, CasosDeTesteContainer } from './styles';

const content = 'Para importar os casos de teste, você precisa fornecer um arquivo .json no padrão';

function CasosDeTeste() {
	const [casosTeste, setCasosTeste] = useState([
		{
			entrada: 'teste',
			saida: 'saida teste'
		},
		{
			entrada: 'teste2',
			saida: 'saida teste2'
		},
	]); 

	function handleAddNewCasoTeste() {
		setCasosTeste([...casosTeste, {entrada: '', saida: ''}]);
	}

	function handleImportCasosTeste() {
		alert('Deve abrir um dialog para envio de arquivo');
	}

	function handleSaveCasosTeste() {
		alert('Deve fazer a requisição para o endpoint correto');    
	}

	return (
		<>
			<NavBar />
			<CasosDeTesteContainer>
				<h1>Casos de Teste</h1>

				<Actions>
					<Button 
						size='large'
						onClick={handleAddNewCasoTeste}
					>
            Novo Caso de teste
					</Button>
					<Button 
						size='large'
						onClick={handleImportCasosTeste}
					>
            Importar casos de teste
					</Button>
					<Popover content={content} title="Instruções de Importação">
						<Button size='large' type="primary">
							<QuestionCircleOutlined />
						</Button>
					</Popover>
				</Actions>

				<CasosDeTesteCadastradosContainer>
					{casosTeste.map((caso, idx) => (
						<Caso key={idx}>
							<Row gutter={[16, 8]}>
								<Col span={12}>
									<h2>Entrada</h2>
									<TextArea
										value={caso['entrada']}
										onChange={(evt) => {
											const novoValor = [...casosTeste];
											novoValor[idx]['entrada'] = evt.target.value;

											setCasosTeste(novoValor);
										}}
										rows={5}
									/>
								</Col>

								<Col span={12}>
									<h2>Saida</h2>
									<TextArea
										value={caso['saida']}
										onChange={(evt) => {
											const novoValor = [...casosTeste];
											novoValor[idx]['saida'] = evt.target.value;

											setCasosTeste(novoValor);
										}}
										rows={5}
									/>
								</Col>
							</Row>
						</Caso>
					))}
					<Button 
						size='large'
						onClick={handleSaveCasosTeste}
					>
            Salvar casos de teste
					</Button>
				</CasosDeTesteCadastradosContainer>
			</CasosDeTesteContainer>
		</>

	);
}

export { CasosDeTeste };