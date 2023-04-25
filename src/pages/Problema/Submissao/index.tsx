import { Button, List, Modal, Table, Tooltip } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useEffect, useMemo, useState } from 'react';
import { ProblemaTabProps } from '../';
import { CorrectIcon } from '../../../assets/icons/CorrectIcon';
import { FailIcon } from '../../../assets/icons/FailIcon';
import { VisualizeIcon } from '../../../assets/icons/VisualizeIcon';
import SubmissaoService from '../../../services/SubmissaoService';
import { ISubmissaoResponse } from '../../../types/Submissao';
import { ICasosDeTeste } from '../../../types/CasosDeTeste';
import CasosDeTesteService from '../../../services/CasosDeTesteService';

const columns = [
	{
		title: 'Data',
		dataIndex: 'data',
		key: 'data',
	},
	{
		title: 'Tempo de execeução',
		dataIndex: 'tempo_execucao',
		key: 'tempo_execucao',
	},
	{
		title: 'Linguagem',
		dataIndex: 'linguagem',
		key: 'linguagem',
	},
	{
		title: 'Avaliação',
		dataIndex: 'avaliacao',
		key: 'avaliacao',
		align: 'center'
	},
	{
		title: 'Visualizar',
		dataIndex: 'visualizar',
		key: 'visualizar',
		align: 'center'
	},
];

function Submissoes({ problemaId }: ProblemaTabProps) {
	const [submissoesProblemaAluno, setSubmissoesProblemaAluno] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [code, setCode] = useState('');
	const [casosTeste, setCasosTeste] = useState({
		casos: [],
		respostas: []
	});
	const [modalRespostaOpen, setModalRespostaOpen] = useState(false);

	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	function handleOpenModal(codigoResposta: string) {
		setCode(codigoResposta);
		setModalOpen(true);
	}

	async function handleShowCasosTeste(submissaoId: number) {
		const { data: casosTesteData } = await CasosDeTesteService.findBySubmissao(submissaoId);
		
		setCasosTeste(casosTesteData);
	}

	const submissoesToColumns = submissoesProblemaAluno
		.map((submissao: ISubmissaoResponse) => ({
			...submissao,
			key: submissao.id,
			tempo_execucao: `${(submissao.tempoMedio * 1000).toFixed(2)} ms`,
			linguagem: submissao.linguagem,
			avaliacao: (
				<Button 
					size='large' 
					type='link'
					onClick={() => handleShowCasosTeste(submissao.id)}
				>
					{submissao.status === 'OK'
						? <CorrectIcon size={32} />
						: <FailIcon size={32} />}
				</Button>),
			visualizar: <VisualizeIcon size={32} onClick={() => handleOpenModal(submissao.codigoResposta)} />
		}));

	useEffect(() => {
		async function loadSubmissoes() {
			const { data } = await SubmissaoService.findByUsuarioAndProblema(user.id, problemaId);
			setSubmissoesProblemaAluno(data);			
		}

		loadSubmissoes();
	}, []);

	return (
		<>
			{!!casosTeste.respostas.length && (
				<List
					grid={{ gutter: 2 }}
					dataSource={casosTeste?.respostas}
					renderItem={(item, idx) => {

						

						return (
							<List.Item key={`item-${idx}`}>
								<p>
									{item.status === 'OK'
										? <CorrectIcon size={25}/>
										: (
											<Tooltip placement="bottom" title={item.status}>
												<FailIcon size={25}/>
											</Tooltip>
										)}
								</p>
							</List.Item>
						);
					}}
				/>
			)}

			<Table
				columns={columns}
				dataSource={submissoesToColumns}
				pagination={false}
			/>
			<Modal
				title="Código resposta"
				centered
				open={modalOpen}
				onOk={() => setModalOpen(false)}
				onCancel={() => setModalOpen(false)}
				closable={false}
				width={700}
			>
				<CodeEditor
					value={code}
					language="py"
					disabled
					placeholder="Please enter Python code."
					onChange={(evt) => setCode(evt.target.value)}
					padding={15}
					style={{
						fontSize: 16,
						border: '#000 2px solid',
						borderRadius: 8,
						marginBottom: 8,
						height: 500
					}}
				/>
			</Modal>
		</>
		
	);
}

export { Submissoes };