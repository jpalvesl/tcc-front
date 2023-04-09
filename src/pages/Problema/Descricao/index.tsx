import { Table } from 'antd';
import { Divider } from '../../../components/Divider';
import { ICasosDeTeste } from '../../../types/CasosDeTeste';
import { Problema } from '../../../types/Problema';
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

interface DescricaoProps {
	problema: Problema;
	casosTeste: ICasosDeTeste[];
}

function Descricao({ problema, casosTeste }: DescricaoProps) {
	const casoFormatado = casosTeste.map(caso => {
		const casoEmParagrafos = caso.entrada.split('\n').map(item => (<p key={item.id}>{item}</p>));

		return {
			...caso,
			entrada: casoEmParagrafos, 
		};
	});

	return (
		<>
			<Section>
				<h1>Descrição</h1>
				<p>
					{problema.descricao}
				</p>
			</Section>

			<Divider />

			<Section>
				<h1>Entrada</h1>
				<p>
					{problema.textoEntrada}
				</p>
			</Section>

			<Divider />

			<Section>
				<h1>Saída</h1>
				<p>
					{problema.textoSaida}
				</p>
			</Section>

			<Divider />

			<Section>
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