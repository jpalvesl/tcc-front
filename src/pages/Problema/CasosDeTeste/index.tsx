import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Divider, Popover, Row, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProblemaTabProps } from '..';
import CasosDeTesteService from '../../../services/CasosDeTesteService';
import { ICasosDeTeste } from '../../../types/CasosDeTeste';
import { Actions, Caso, CasosDeTesteCadastradosContainer, CasosDeTesteContainer } from './styles';
const { Panel } = Collapse;

const content = 'Para importar os casos de teste, você precisa fornecer um arquivo .json no padrão';

function CasosDeTeste({ problemaId } :ProblemaTabProps) {
	const [casosTeste, setCasosTeste] = useState<ICasosDeTeste[]>([]); 
	const [activeKey, setActiveKey] = useState<string[]>([]); 


	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	function removeCasoDeTeste(caso: number) {
		const novosCasos = casosTeste
			.filter(casoTeste => casoTeste.caso !== caso)
			.map((casoTeste, idx) => ({
				...casoTeste,
				caso: idx+1
			}));

		setCasosTeste(novosCasos);
	}

	function CasosHeader(caso: number) {
		return (
			<div style={{
				display: 'flex',
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

		(async () => {
			const { data: casosTesteData } = await CasosDeTesteService.findByProblema(problemaId);

			setCasosTeste(casosTesteData);
		})();
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

	async function handleSaveCasosTeste() {
		try {
			await CasosDeTesteService.editEmLote(problemaId, user.id, casosTeste);
			toast('Casos de teste editados');
		} catch (error) {
			toast('Erro ao editar casos de teste');
		}

	}

	function onChange(key: string | string[]) {
		setActiveKey(key);
	}

	function toggleCollapse() {
		if (activeKey.length === 0) {
			setActiveKey(casosTeste.map((caso, idx) => String(idx)));
			return;
		}

		setActiveKey([]);
		return;
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

			<Divider />

			<Button 
				type='text'
				size='large'
				onClick={toggleCollapse}
				style={{
					fontWeight: 'bold'
				}}
			>
				<PlusOutlined />
				{activeKey.length === 0 ? 'Mostrar todos': 'Colapsar todos'}
			</Button>
			<CasosDeTesteCadastradosContainer>
				{casosTeste.map((caso, idx) => (
					<Collapse 
						collapsible='icon' 
						key={idx} bordered={false} 
						style={{backgroundColor: 'transparent'}}
						activeKey={activeKey}
						onChange={onChange}
					>
						<Panel 
							key={idx} 
							header={CasosHeader(caso.caso)}
							forceRender
						>
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