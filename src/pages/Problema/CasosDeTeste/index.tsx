import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Popover, Row, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { ProblemaTabProps } from '..';
import { ICasosDeTeste } from '../../../types/CasosDeTeste';
import { Actions, Caso, CasosDeTesteCadastradosContainer, CasosDeTesteContainer } from './styles';
const { Panel } = Collapse;

const content = 'Para importar os casos de teste, você precisa fornecer um arquivo .json no padrão';

function CasosDeTeste({ problemaId, casosTeste: casosTesteProps } :ProblemaTabProps) {
	const [casosTeste, setCasosTeste] = useState<ICasosDeTeste[]>([...casosTesteProps]); 

	function removeCasoDeTeste(caso: number) {
		const novosCasos = casosTeste
			.filter(casoTeste => casoTeste.caso !== caso)
			.map((casoTeste, idx) => ({
				...casoTeste,
				caso: idx+1
			}));

		console.log(novosCasos);

		setCasosTeste(novosCasos);
	}

	function CasosHeader(caso: number) {
		return (
			<div style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
				{`Caso ${caso}`}
				<Button 
					type='primary'
					onClick={() => removeCasoDeTeste(caso)}
				>
					Remover caso de teste
				</Button>
			</div>
		);
	}

	useEffect(() => {
		document.title = 'Problema - Casos de teste';
	}, []);

	function handleAddNewCasoTeste() {
		const caso = casosTeste.length + 1;		

		setCasosTeste([...casosTeste, {
			problemaId,
			caso,
			entrada: '',
			saida: '',
		}]);
	}

	function handleImportCasosTeste() {
		alert('Deve abrir um dialog para envio de arquivo');
	}

	function handleSaveCasosTeste() {
		alert('Deve fazer a requisição para o endpoint correto');    
	}

	return (
		<CasosDeTesteContainer>
			<h1>Casos de Teste</h1>

			<Actions>
				<Button 
					size='large'
					onClick={handleAddNewCasoTeste}
				>
            Novo Caso de teste
				</Button>
				<Upload
					accept='.json'
					showUploadList={false}
					maxCount={1}
					customRequest={(evt => console.log(evt.data))}
				>
					<Button 
						size='large'
					>
							Importar casos de teste
					</Button>
				</Upload>
				<Popover content={content} title="Instruções de Importação">
					<Button size='large' type="primary">
						<QuestionCircleOutlined />
					</Button>
				</Popover>
			</Actions>

			<CasosDeTesteCadastradosContainer>
				{casosTeste.map((caso, idx) => (
					<Collapse key={idx} bordered={false} style={{backgroundColor: 'transparent'}}>
						<Panel key={idx} header={CasosHeader(caso.caso)}>
							<Caso>
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
						</Panel>
					</Collapse>
				))}
				<Button 
					size='large'
					onClick={handleSaveCasosTeste}
				>
            Salvar casos de teste
				</Button>
			</CasosDeTesteCadastradosContainer>
		</CasosDeTesteContainer>
	);
}

export { CasosDeTeste };