import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import { PermissoesContainer } from './styles';

function Permissoes() {
	useEffect(() => {
		document.title = 'Gerenciar Permissões';
	}, []);
  
	return (
		<>
			<NavBar />    
			<PermissoesContainer>
				<h1>Gerenciar permissoes</h1>

				<Divider />

				<Form
					name="basic"
					layout='vertical'
					onFinish={()=> {}}
					onFinishFailed={() => {}}
				>

					<h2>Administradores</h2>
					<Form.Item
						label='Instituicao'
						name='senha'
					>
						<Input
							size='large'
							type='password'
							// value={senha}
							// onChange={(evt) => setSenha(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item
						label='Administradores'
						name='senha'
					>
						<Input
							size='large'
							type='password'
							// value={senha}
							// onChange={(evt) => setSenha(evt.target.value)}
						/>
					</Form.Item>

					<Divider />
					<h2>Professores</h2>
					<Form.Item
						label='Instituicao'
						name='senha'
					>
						<Input
							size='large'
							type='password'
							// value={senha}
							// onChange={(evt) => setSenha(evt.target.value)}
						/>
					</Form.Item>

					<Form.Item
						label='Administradores'
						name='senha'
					>
						<Input
							size='large'
							type='password'
							// value={senha}
							// onChange={(evt) => setSenha(evt.target.value)}
						/>
					</Form.Item>


				</Form>

        
			</PermissoesContainer>
		</>
	);
}

export { Permissoes };