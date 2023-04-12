import { CheckCircle, MagnifyingGlass, XCircle } from '@phosphor-icons/react';
import { Table } from 'antd';

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

const dataCasosDeTeste = [
	{
		key: '1',
		data: '01/11/2022',
		tempo_execucao: '0.0204s',
		linguagem: 'Python',
		avaliacao: <CheckCircle size={32} />,
		visualizar: <MagnifyingGlass size={32} />
	},
	{
		key: '2',
		data: '02/11/2022',
		tempo_execucao: '0.0382s',
		linguagem: 'Python',
		avaliacao: <XCircle size={32} />,
		visualizar: <MagnifyingGlass size={32} />
	},
];

function Submissoes() {
	return (
		<Table
			columns={columns}
			dataSource={dataCasosDeTeste}
			pagination={false}
		/>
	);
}

export { Submissoes };