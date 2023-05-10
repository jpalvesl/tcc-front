import { Button, Checkbox, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProblemaTabProps } from '..';
import ProblemaService from '../../../services/ProblemaService';
import TopicoService from '../../../services/TopicoService';
import { Problema } from '../../../types/Problema';
import { Topico } from '../../../types/Topico';
import { decrypt } from '../../../utils/crypto';

function Editar({ problema }: ProblemaTabProps) {
	const [problemaEditado, setProblemaEditado] = useState({ ...problema } as Problema);
	const [topicosOptions, setTopicosOptions] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Problema - Edição';
	}, []);

	const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));

	useEffect(() => {
		(async () => {
			const { data } = await TopicoService.findByAll();
			
			const topicosToOptions = data.map((topico: Topico) => ({
				value: topico.id,
				label: topico.nome
			}));

			setTopicosOptions(topicosToOptions);
		})();
	}, []);

	async function handleOnFinish() {
		try {
			ProblemaService.edit(problemaEditado, user.id);
			toast('Problema alterado com sucesso');
			navigate('/problema');
		} catch (error) {
			toast.error('Ocorreu um erro ao tentar editar o problema');
		}
	}

	function updateProblemaEditatoInput(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setProblemaEditado({
			...problemaEditado,
			[evt.target.name]: evt.target.value
		});
	}

	function formatInitialValues() {
		return {
			...problema,
			topicos: problema?.topicos.map(topico => ({
				label: topico.nome,
				value: topico.id
			}))
		};
	}

	function handleChangeTopicos(topicos: number[]) {
		setProblemaEditado({
			...problemaEditado,
			topicos: topicos.map(id => ({
				id
			}))
		});
	}

	return (
		<Form
			name="basic"
			layout='vertical'
			initialValues={formatInitialValues()}
			onFinish={handleOnFinish}
			autoComplete="off"
		>
			<Form.Item
				label='Nome do problema'
			>
				<Input
					size='large'
					name='nome'
					value={problemaEditado.nome}
					onChange={(evt) => updateProblemaEditatoInput(evt)}
				/>
			</Form.Item>

			<Form.Item
				label='Fonte'
			>
				<Input
					size='large'
					name='fonte'
					value={problemaEditado.fonte}
					onChange={(evt) => updateProblemaEditatoInput(evt)}
				/>
			</Form.Item>

			<Form.Item
				label='Tópicos'
				name='topicos'
			>
				<Select
					size='large'
					mode='multiple'
					allowClear
					options={topicosOptions}
					value={problema?.topicos}
					onChange={(value) => handleChangeTopicos(value)}
				/>
			</Form.Item>

			<Form.Item
				label='Dificuldade'
				name='dificuldade'
			>
				<Select
					size='large'
					value={problemaEditado.dificuldade}
					onChange={(value) => setProblemaEditado({
						...problemaEditado,
						dificuldade: value
					})}
					options={[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' } ]}
				/>
			</Form.Item>

			<Form.Item
				label='Descrição'
			>
				<TextArea
					rows={5}
					name='descricao'
					value={problemaEditado.descricao}
					onChange={(evt) => updateProblemaEditatoInput(evt)}
				/>
			</Form.Item>

			<Form.Item
				label='Texto Entrada'
			>
				<TextArea
					rows={5}
					name='textoEntrada'
					value={problemaEditado.textoEntrada}
					onChange={(evt) => updateProblemaEditatoInput(evt)}
				/>
			</Form.Item>

			<Form.Item
				label='Texto Saida'
			>
				<TextArea
					rows={5}
					name='textoSaida'
					value={problemaEditado.textoSaida}
					onChange={(evt) => updateProblemaEditatoInput(evt)}
				/>
			</Form.Item>

			<Form.Item>
				<Checkbox 
					name='problemaDeProva'
					checked={problema?.problemaDeProva}
					onChange={(evt) => setProblemaEditado({
						...problemaEditado,
						problemaDeProva: evt.target.checked
					})}
				>
					Problema de Prova
				</Checkbox>
			</Form.Item>
			

			<Form.Item>
				<Button 
					size='large' type="primary" 
					htmlType="submit"
				>
					Salvar alterações
				</Button>
			</Form.Item>
		</Form>
	);
}

export { Editar };