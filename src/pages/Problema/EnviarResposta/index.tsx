import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProblemaTabProps } from '..';
import SubmissaoService from '../../../services/SubmissaoService';
import { ISubmissaoRequest } from '../../../types/Submissao';
import { decrypt } from '../../../utils/crypto';

function EnviarResposta({ problemaId }: ProblemaTabProps) {
	const [code, setCode] = useState(
		'# adicione o seu codigo python aqui\n'
	);

	useEffect(() => {
		document.title = 'Problema - Enviar resposta';
	}, []);
	
	const user = JSON.parse(decrypt(localStorage.getItem('@Auth:user')));

	async function handleEnviaResposta() {
		await SubmissaoService.realizaSubmissao(problemaId, user.id, {
			codigoResposta: code
		} as ISubmissaoRequest)
			.then(() => {
				toast('Submissão realizada com sucesso');
			})
			.catch((err) => {
				console.error(err);
				toast(err.response.data.message);
			});
	}

	return (
		<div  style={{
			textAlign: 'right'
		}}>
			<CodeEditor
				value={code}
				language="py"
				placeholder="Please enter Python code."
				minHeight={800}
				onChange={(evt) => setCode(evt.target.value)}
				padding={15}
				style={{
					fontSize: 16,
					border: '#000 4px solid',
					borderRadius: 8,
					marginBottom: 8,
				}}
			/>
			<Button 
				size='large'
				onClick={handleEnviaResposta}
			>
				Enviar Submissão
			</Button>
		</div>
	);
}

export { EnviarResposta };