import { Button, Form, Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Divider } from '../../../components/Divider';
import { NavBar } from '../../../components/NavBar';
import UsuarioService from '../../../services/UsuarioService';
import { Usuario } from '../../../types/Usuario';
import { CampoForm, CampoImage, PerfilContainer } from './styles';
import { toast } from 'react-toastify';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '../../../firebase';



function EditarPerfil (){
	const { id } = useParams();
	const [model,setModel] = useState<Usuario>({
		nome: '',
		usuario: '',
		senha: '',
		instituicaoAtualId: 1,
		email: '',
		ehProfessor: false,
		ehAdm: false,
		imagemUrl: ''
	});

	const navigate = useNavigate();
	const [imgUrl,setImgUrl] = useState('');
	const [progress,setProgress] = useState(0);
	const [login, setLogin] = useState(false);

	const handleUpload= (event) => {
		setLogin(true);
		event.preventDefault();

		const file = event.target[0]?.files[0];
		if(!file) return;


		const storageRef = ref(storage, `imagens/${file.name}`);
		const uploadTaks = uploadBytesResumable(storageRef, file);

		uploadTaks.on(
			'state_changed',
			snapshot => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progress);
			},
			error => {
				alert(error);
			},
			() => {
				getDownloadURL(uploadTaks.snapshot.ref).then(url => {
					setImgUrl(url);
					setLogin(false);
				}) ;	
			}
		);
	};

	
	useEffect(()=> {
		if(id !== undefined){
			findTask(id);
			
		}
		
		document.title = 'Editar perfil';
	},[id]);

	function updateUser(e: ChangeEvent<HTMLInputElement>) {
		setModel({
			... model,
			[e.target.name]: e.target.value
		});
		
		
	}

	async function findTask(id:number) {
		const response = await UsuarioService.findById(id);
		
		setModel( {
			id,
			nome: response.data.nome,
			usuario: response.data.usuario,
			senha: response.data.senha,
			instituicaoAtualId: 1,
			email: response.data.email,
			ehProfessor: response.data.ehProfessor,
			ehAdm: response.data.ehAdm,
			imagemUrl: response.data.imagemUrl
		});
		setImgUrl(response.data.imagemUrl);
		
		
	}

	

	

	
	async function handleOnFinish(id: number){
		model.imagemUrl = imgUrl;
		
		await UsuarioService.edit(id,model);
		const resposta = await UsuarioService.findById(id);
		
		console.log(resposta);
	}

	


	return(
		<>
			
			<NavBar></NavBar>
			<PerfilContainer>
				<h2>Perfil</h2>
				<Divider/>
				<div className='container'>
					<CampoImage>
						<div className='imagem'>
							
							{imgUrl && <img src={imgUrl} alt="Imagem" />}
							
						</div>
						<div className='formImg'>
							{login && <progress value={progress} max='100'/>}
							<Form onSubmitCapture={handleUpload}>
								
								<Input 
									name="img"
									type='file'
								/>
								
								
								<Button 
									type="primary" 
									htmlType="submit"
									style={{float: 'right'}}
								>Enviar</Button>
						
								
									
								
							</Form>
						</div>
						
						
						
					</CampoImage>
					<CampoForm>
						{model.email && <>
							<Form
								name="basic"
								layout='vertical'
								initialValues={model}
								onFinish={()=> handleOnFinish(id)}
							
							>
								<Form.Item
									label='Email'
									name='email'
								
									rules={[{required: true, message: 'Por favor digite o seu e-mail!'}]}
								>
								
								
									<Input 
										size='large'
										type='email'
										value={model.email}
										name="email"
										onChange={(e)=> updateUser(e)}
									
									/>
								</Form.Item>

								<Form.Item
									label='Nome'
									name='nome'
									rules={[{required: true, message: 'Por favor digite o nome!'}]}
								>
									<Input 
										size='large'
										value={model.nome}
										name="nome"
										onChange={(e)=> updateUser(e)}
									
									/>
								</Form.Item>

								<Form.Item
									label='Usuario'
									name='usuario'
									rules={[{required: true, message: 'Por favor digite o usuario!'}]}
								>
									<Input 
										size='large'
										value='teste'
										name="usuario"
										onChange={(e)=> updateUser(e)}
									/>
								</Form.Item>

								<Form.Item>
									<p><Link to={`/perfil/${id}/password`}>Alterar senha</Link></p>
								</Form.Item>

								<Form.Item>
									
									<Button 
										style={{float: 'right'}} 
										size='large' type="primary" 
										htmlType="submit"
										
									>
								Salvar
									</Button>
								
									<Link to={'/perfil'}>
										<Button 
											style={{float: 'right', marginRight: '5px'}} 
											size='large' >
								Cancelar
										</Button></Link>
								
								</Form.Item>
								<Form.Item>
									
								</Form.Item>
							</Form>
							
						</>}
						
						
					</CampoForm>
				</div>

				
				
			</PerfilContainer>
		</>
	);
}
export {EditarPerfil};