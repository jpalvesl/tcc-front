import { Table } from 'antd';
import { useEffect } from 'react';
import { ProblemaTabProps } from '..';
import { Divider } from '../../../components/Divider';
import { Section } from './styles';

const columns = [
	{
		title: 'Entrada',
		dataIndex: 'entrada',
		key: 'entrada',
	},
	{
		title: 'Saída',
		dataIndex: 'saida',
		key: 'saida',
	},
];

function Descricao({ problema, casosTeste }: ProblemaTabProps) {
	useEffect(() => {
		document.title = 'Problema - Descrição';
	}, []);
	
	const casoFormatado = casosTeste?.map(caso => {
		const casoEmParagrafos = caso.entrada.split('\n').map((item, idx) => (<p key={`item-${idx}`}>{item}</p>));
		const saida = caso.saida.split('\n').map((item, idx) => (<p key={`item-${idx}`}>{item}</p>));

		return {
			...caso,
			entrada: casoEmParagrafos, 
			saida
		};
	});

	return (
		<>
			<Section className='descricaoProblema'>
				<h1>Descrição</h1>
				<p>
					{problema?.descricao}
				</p>
			</Section>

			<Divider />

			<Section className='entradaProblema'>
				<h1>Entrada</h1>
				<p>
					{problema?.textoEntrada}
				</p>
			</Section>

			<Divider />

			<Section className='saidaProblema'>
				<h1>Saída</h1>
				<p>
					{problema?.textoSaida}
				</p>
			</Section>

			<Divider />

			<Section className='casosTeste'>
				<h1>Casos de teste</h1>
				<Table
					columns={columns}
					dataSource={casoFormatado}
					pagination={false}
				/>
			</Section>
		</>
	);
}

export { Descricao };