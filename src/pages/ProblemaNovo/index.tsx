import { Button, Checkbox, Form, Input, Select, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { NavBar } from '../../components/NavBar';
import { ProblemaNovoContainer } from './styles';

function ProblemaNovo() {
	return (
		<>
			<NavBar />
			<ProblemaNovoContainer>
				<h1>Criar Problema</h1>

				<Form
					name="basic"
					layout='vertical'
					initialValues={{ remember: true }}
					// onFinish={handleOnFinish}
					// onFinishFailed={handleOnFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label='Nome do problema'
						name='nome_problema'
					>
						<Input
							size='large'
							type='text'
						/>
					</Form.Item>

					<Form.Item
						label='Fonte'
						name='fonte'
					>
						<Input
							size='large'
						/>
					</Form.Item>

					<Form.Item
						label='Tópicos'
						name='topicos'
					>
						<Select
							size='large'
							options={[{ value: '1', label: 'String' }, { value: '2', label: 'Repetição' }]}
						/>
					</Form.Item>

					<Form.Item
						label='Dificuldade'
						name='dificuldade'
					>
						<Select
							size='large'
							options={[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' } ]}
						/>
					</Form.Item>

					<Form.Item
						label='Descrição'
						name='descricao'
					>
						<TextArea
							rows={5}
						/>
					</Form.Item>

					<Form.Item
						label='Entrada'
						name='entrada'
					>
						<TextArea
							rows={5}
						/>
					</Form.Item>

					<Form.Item
						label='Saida'
						name='saida'
					>
						<TextArea
							rows={5}
						/>
					</Form.Item>

					<Form.Item>
						<Checkbox onChange={(e) => {
							console.log(`checked = ${e.target.checked}`);
						}}>Problema de Prova</Checkbox>
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