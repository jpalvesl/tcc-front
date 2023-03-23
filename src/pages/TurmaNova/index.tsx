import locale from 'antd/es/date-picker/locale/pt_BR';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Divider } from '../../components/Divider';

import { TurmaNovaContainer } from './styles';
import { NavBar } from '../../components/NavBar';

const { RangePicker } = DatePicker;

function TurmaNova() {
	return (
		<>
			<NavBar />    
			<TurmaNovaContainer>
				<h1>Criar Turma</h1>
				<Divider />
				<Form layout='vertical'>
					<Form.Item label="Título">
						<Input size='large' />
					</Form.Item>

					<Form.Item label="Semestre">
						<Input size='large' />
					</Form.Item>

					<Form.Item label="Turma">
						<Select
							size='large'
							defaultValue="a"
							options={[{ value: 'a', label: 'a' },
								{ value: 'b', label: 'b' }]}
						/>
					</Form.Item>

					<Form.Item label="Instituicao">
						<Select
							size='large'
							defaultValue="IFPB - Campina Grande"
							options={[{ value: 'ifpb', label: 'IFPB - Campina Grande' }]}
						/>
					</Form.Item>

					<Form.Item label="Professores">
						<Select
							size='large'
							defaultValue="IFPB - Campina Grande"
							options={[{ value: 'ifpb', label: 'IFPB - Campina Grande' }]}
						/>
					</Form.Item>

					<Form.Item label="Monitores">
						<Select
							size='large'
							defaultValue="IFPB - Campina Grande"
							options={[{ value: 'ifpb', label: 'IFPB - Campina Grande' }]}
						/>
					</Form.Item>

					<Form.Item label="Datas">
						<RangePicker size='large' locale={locale} />
					</Form.Item>

					<Button size='large' style={{ width: '100%' }} >
          Criar Turma
					</Button>
				</Form>
			</TurmaNovaContainer>
		</>
	);
}

export { TurmaNova };