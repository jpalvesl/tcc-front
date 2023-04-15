import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button } from 'antd';
import { useState } from 'react';
import SubmissaoService from '../../../services/SubmissaoService';
import { ISubmissaoRequest } from '../../../types/Submissao';

interface EnviarRepostaProps {
	problemaId: number;
}

function EnviarResposta({ problemaId }: EnviarRepostaProps) {
	const [code, setCode] = useState(
		'# adicione o seu codigo python aqui\n'
	);

	const user = JSON.parse(localStorage.getItem('@Auth:user'));

	async function handleEnviaResposta() {
		await SubmissaoService.realizaSubmissao(user.id, problemaId, {
			codigoResposta: code
		} as ISubmissaoRequest)
			.then(() => alert('Realizou a submissao'))
			.catch(() => alert('Ocorreu um erro na submissao'));
	}

	return (
		<div style={{
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