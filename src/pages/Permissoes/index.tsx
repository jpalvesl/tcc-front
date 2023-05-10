import { Button, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import { PermissoesContainer } from './styles';
import InstituicaoService from '../../services/InstituicaoService';
import { Instituicao } from '../../types/Instituicao';

function Permissoes() {
	const [permissoesAlteradas, setPermissoesAlteradas] = useState({
		novosAdms: [],
		antigosAdms: [],
		novosProfessores: [],
		antigosProfessores: [],
	});

	const [instituicoesOptions, setInstituicoesOptions] = useState([]);
	const [usuarioOptions, setUsuarioOptions] = useState([]);



	useEffect(() => {
		document.title = 'Gerenciar Permissões';

		async function loadInstituicoes() {
			const { data } = await InstituicaoService.findAll();

			const dadosFormatados = data.map((instituicao: Instituicao) => ({
				value: instituicao.id,
				label: `${instituicao.nome} - ${instituicao.campus}`
			}));

			setInstituicoesOptions(dadosFormatados);
		}

		loadInstituicoes();
	}, []);

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
  
	return (
		<>
			<NavBar />    
			<PermissoesContainer>
				<h1>Gerenciar permissões</h1>

				<Divider />

				<Form
					name="basic"
					layout='vertical'
					onFinish={()=> {}}
					onFinishFailed={() => {}}
				>

					<h2>Administradores</h2>

					<h3>Adicionar novos administradores</h3>
					<Form.Item
						label='Instituição'
						name='instituicao-1'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='novos-adms'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={[
								{ value: 'João Pedro', label: 'João Pedro' },
								{ value: 'Myrlla Lucas', label: 'Myrlla Lucas' },
							]}
							mode='multiple'
						/>
					</Form.Item>


					<h3>Revogar permissão de administrador</h3>
					<Form.Item
						label='Instituição'
						name='instituicao-2'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='antigos-adms'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={[
								{ value: 'jack', label: 'Jack' },
								{ value: 'lucy', label: 'Lucy' },
								{ value: 'Yiminghe', label: 'yiminghe' },
								{ value: 'disabled', label: 'Disabled', disabled: true },
							]}
							disabled
						/>
					</Form.Item>

					<Divider />
					
					<h2>Professores</h2>

					<h3>Adicionar novos professores</h3>
					<Form.Item
						label='Instituição'
						name='instituicao-3'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='novos-professores'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={[
								{ value: 'jack', label: 'Jack' },
								{ value: 'lucy', label: 'Lucy' },
								{ value: 'Yiminghe', label: 'yiminghe' },
								{ value: 'disabled', label: 'Disabled', disabled: true },
							]}
							disabled
						/>
					</Form.Item>


					<h3>Revogar permissão de professor</h3>
					<Form.Item
						label='Instituição'
						name='instituicao-4'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='antigos-professores'
					>
						<Select
							size='large'
							onChange={handleChange}
							options={[
								{ value: 'jack', label: 'Jack' },
								{ value: 'lucy', label: 'Lucy' },
								{ value: 'Yiminghe', label: 'yiminghe' },
								{ value: 'disabled', label: 'Disabled', disabled: true },
							]}
							disabled
						/>
					</Form.Item>

					<Button 
						size='large'
						type='primary'
					>
						Salvar
					</Button>
				</Form>

        
			</PermissoesContainer>
		</>
	);
}

export { Permissoes };