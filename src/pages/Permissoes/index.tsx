import { Button, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Divider } from '../../components/Divider';
import { NavBar } from '../../components/NavBar';
import { PermissoesContainer } from './styles';
import InstituicaoService from '../../services/InstituicaoService';
import { Instituicao } from '../../types/Instituicao';
import UsuarioService from '../../services/UsuarioService';
import { Usuario } from '../../types/Usuario';
import { decrypt } from '../../utils/crypto';
import { GerenciarPermissoes } from '../../types/GerenciarPermissoes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Permissoes() {
	const [permissoesAlteradas, setPermissoesAlteradas] = useState({
		novosAdms: [],
		antigosAdms: [],
		novosProfessores: [],
		antigosProfessores: [],
	});

	const [instituicoesOptions, setInstituicoesOptions] = useState([]);
	const [usuarioOptions, setUsuarioOptions] = useState({
		novosAdms: [],
		antigosAdms: [],
		novosProfessores: [],
		antigosProfessores: [],
	});

	const navigate = useNavigate();

	const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));

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
  
	async function handleOnFinish() {
		try {
			await UsuarioService.gerenciarPermissoes(user.id, permissoesAlteradas);
			toast('Permissões alteradas com sucesso');
			navigate('/');
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	return (
		<>
			<NavBar />    
			<PermissoesContainer>
				<h1>Gerenciar permissões</h1>

				<Divider />

				<Form
					name="basic"
					layout='vertical'
					onFinish={handleOnFinish}
				>

					<h2>Administradores</h2>

					<h3>Adicionar novos administradores</h3>
					<Form.Item
						label='Instituição'
						name='instituicao-1'
					>
						<Select
							size='large'
							onChange={async (value) => {
								const { data } = await UsuarioService.findByInstituicao(Number(value));
								
								const usuarios = data
									.filter((usuario: Usuario) => !usuario.ehAdm)
									.map((usuario: Usuario) => ({
										value: usuario.id,
										label: usuario.nome
									}));

								setUsuarioOptions({
									...usuarioOptions,
									novosAdms: usuarios
								});
							}}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='novosAdms'
					>
						<Select
							size='large'
							onChange={(value) => setPermissoesAlteradas({...permissoesAlteradas, novosAdms: value})}
							options={usuarioOptions.novosAdms}
							disabled={!usuarioOptions.novosAdms.length}
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
							onChange={async (value) => {
								const { data } = await UsuarioService.findByInstituicao(Number(value));
								
								const usuarios = data
									.filter((usuario: Usuario) => usuario.ehAdm)
									.map((usuario: Usuario) => ({
										value: usuario.id,
										label: usuario.nome
									}));
								
								setUsuarioOptions({
									...usuarioOptions,
									antigosAdms: usuarios
								});
							}}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='antigosAdms'
					>
						<Select
							size='large'
							onChange={(value) => setPermissoesAlteradas({...permissoesAlteradas, antigosAdms: value})}
							options={usuarioOptions.antigosAdms}
							disabled={!usuarioOptions.antigosAdms.length}
							mode='multiple'
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
							onChange={async (value) => {
								const { data } = await UsuarioService.findByInstituicao(Number(value));
								
								const usuarios = data
									.filter((usuario: Usuario) => !usuario.ehProfessor)
									.map((usuario: Usuario) => ({
										value: usuario.id,
										label: usuario.nome
									}));

								setUsuarioOptions({
									...usuarioOptions,
									novosProfessores: usuarios
								});
							}}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='novosProfessores'
					>
						<Select
							size='large'
							onChange={(value) => setPermissoesAlteradas({...permissoesAlteradas, novosProfessores: value})}
							options={usuarioOptions.novosProfessores}
							disabled={!usuarioOptions.novosProfessores.length}
							mode='multiple'
						/>
					</Form.Item>


					<h3>Revogar permissão de professor</h3>
					<Form.Item
						label='Instituição'
						name='instituicao-4'
					>
						<Select
							size='large'
							onChange={async (value) => {
								const { data } = await UsuarioService.findByInstituicao(Number(value));
								
								const usuarios = data
									.filter((usuario: Usuario) => usuario.ehProfessor)
									.map((usuario: Usuario) => ({
										value: usuario.id,
										label: usuario.nome
									}));

								setUsuarioOptions({
									...usuarioOptions,
									antigosProfessores: usuarios
								});
							}}
							options={instituicoesOptions}
						/>
					</Form.Item>

					<Form.Item
						label='Usuário'
						name='antigosProfessores'
					>
						<Select
							size='large'
							onChange={(value) => setPermissoesAlteradas({...permissoesAlteradas, antigosProfessores: value})}
							options={usuarioOptions.antigosProfessores}
							disabled={!usuarioOptions.antigosProfessores.length}
							mode='multiple'
						/>
					</Form.Item>

					<Button 
						size='large'
						type='primary'
						htmlType="submit"
					>
						Salvar
					</Button>
				</Form>

        
			</PermissoesContainer>
		</>
	);
}

export { Permissoes };