import { Button, Checkbox, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavBar } from '../../components/NavBar';
import ProblemaService from '../../services/ProblemaService';
import TopicoService from '../../services/TopicoService';
import { Problema } from '../../types/Problema';
import { Topico } from '../../types/Topico';
import { ProblemaNovoContainer } from './styles';
import { decrypt } from '../../utils/crypto';

const dificuldade = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' },
	{ value: '5', label: '5' },
];

function ProblemaNovo() {
	const [problema, setProblema] = useState({} as Problema);
	const [topicosOptions, setTopicosOptions] = useState([]);

	const navigate = useNavigate();

	const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));

	useEffect(() => {
		(async () => {
			const { data } = await TopicoService.findByAll();
				
			const dataFormatada = data.map((topico: Topico) => ({
				value: topico.id,
				label: topico.nome
			}));

			document.title = 'Criação de problema';
			setTopicosOptions(dataFormatada);
		})();
	}, []);
	
	function updateProblema(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setProblema({
			...problema,
			[evt.target.name]: evt.target.value
		});
	}



	async function handleOnFinish() {
		try {
			ProblemaService.add({...problema, criadorId: user.id});
			toast('Problema criado com sucesso');
			navigate('/problema');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<NavBar />
			<ProblemaNovoContainer>
				<h1>Criar Problema</h1>

				<Form
					name="basic"
					layout='vertical'
					onFinish={handleOnFinish}
					// onFinishFailed={handleOnFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label='Nome do problema'
					>
						<Input
							size='large'
							name='nome'
							value={problema.nome}
							onChange={(evt) => updateProblema(evt)}
						/>
					</Form.Item>

					<Form.Item
						label='Fonte'
					>
						<Input
							size='large'
							name='fonte'
							value={problema.fonte}
							onChange={(evt) => updateProblema(evt)}
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
							onChange={(topicos) => setProblema({
								...problema,
								topicos
							})}
						/>
					</Form.Item>

					<Form.Item
						label='Dificuldade'
						name='dificuldade'
					>
						<Select
							size='large'
							options={dificuldade}
							onChange={dificuldade => setProblema({
								...problema,
								dificuldade
							})}
						/>
					</Form.Item>

					<Form.Item
						label='Tempo limite'
					>
						<Input
							size='large'
							type='number'
							name='tempoLimite'
							value={problema.tempoLimite}
							onChange={(evt) => updateProblema(evt)}
						/>
					</Form.Item>

					<Form.Item
						label='Limite de memória'
					>
						<Input
							size='large'
							type='number'
							name='limiteDeMemoria'
							value={problema.limiteDeMemoria}
							onChange={(evt) => updateProblema(evt)}
						/>
					</Form.Item>



					<Form.Item
						label='Descrição'
					>
						<TextArea
							rows={5}
							name='descricao'
							value={problema.descricao}
							onChange={evt => updateProblema(evt)}
						/>
					</Form.Item>

					<Form.Item
						label='Entrada'
					>
						<TextArea
							rows={5}
							name='textoEntrada'
							value={problema.textoEntrada}
							onChange={evt => updateProblema(evt)}
						/>
					</Form.Item>

					<Form.Item
						label='Saida'
					>
						<TextArea
							rows={5}
							name='textoSaida'
							value={problema.textoSaida}
							onChange={evt => updateProblema(evt)}
						/>
					</Form.Item>

					<Form.Item>
						<Checkbox 
							onChange={(evt) => setProblema({
								...problema,
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
            Criar problema
						</Button>
					</Form.Item>
				</Form>
			</ProblemaNovoContainer>
		</>
	);
}

export { ProblemaNovo };