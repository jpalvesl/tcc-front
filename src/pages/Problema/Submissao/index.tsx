import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { ProblemaTabProps } from '../';
import { CorrectIcon } from '../../../assets/icons/CorrectIcon';
import { FailIcon } from '../../../assets/icons/FailIcon';
import { VisualizeIcon } from '../../../assets/icons/VisualizeIcon';
import SubmissaoService from '../../../services/SubmissaoService';
import { ISubmissaoResponse } from '../../../types/Submissao';

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

	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	const submissoesToColumns = submissoesProblemaAluno
		.map((submissao: ISubmissaoResponse) => ({
			...submissao,
			key: submissao.id,
			tempo_execucao: `${(submissao.tempoMedio * 1000).toFixed(2)} ms`,
			linguagem: submissao.linguagem,
			avaliacao: submissao.status === 'ok'
				? <CorrectIcon size={32} />
				: <FailIcon size={32} />,
			visualizar: <VisualizeIcon size={32} onClick={() => alert(submissao.codigoResposta)} />
		}));

	useEffect(() => {
		async function loadSubmissoes() {
			const { data } = await SubmissaoService.findByUsuarioAndProblema(user.id, problemaId);
			setSubmissoesProblemaAluno(data);			
		}

		loadSubmissoes();
	}, []);

	return (
		<Table
			columns={columns}
			dataSource={submissoesToColumns}
			pagination={false}
		/>
	);
}

export { Submissoes };