import { Table } from 'antd';
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

const dataCasosDeTeste = [
	{
		key: '1',
		entrada: 5.66,
		saida: 'Acida'
	},
	{
		key: '2',
		entrada: 7,
		saida: 'Neutra'
	},
];

function Descricao() {
	return (
		<>
			<Section>
				<h1>Descrição</h1>
				<p>
              Escreva um programa que leia o valor do índice de acidez (pH) de uma solução e informe se ela é ácida, básica ou neutra. <br /><br />
              A solução é ácida quando o pH é menor que 7 <br /><br />
              A solução é básica quando o pH é maior que 7
              Caso contrário a solução é neutra
				</p>
			</Section>

			<Divider />

			<Section>
				<h1>Entrada</h1>
				<p>
              O valor do pH (entre 1.0 e 14.0)
				</p>
			</Section>

			<Divider />

			<Section>
				<h1>Saída</h1>
				<p>
              Caso a solução seja básica, escreva "Basica" na saída <br/><br/>
              Caso a solução seja ácida, escreva "Acida" na saída <br/><br/>
              Caso a solução seja neutra, escreva "Neutra" na saída
				</p>
			</Section>

			<Divider />

			<Section>
				<h1>Casos de teste</h1>
				<Table
					columns={columns}
					dataSource={dataCasosDeTeste}
					pagination={false}
				/>
			</Section>
		</>
	);
}

export { Descricao };