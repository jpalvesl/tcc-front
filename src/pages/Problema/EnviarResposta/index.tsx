import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button } from 'antd';
import { useState } from 'react';

function EnviarResposta() {
	const [code, setCode] = useState(
		'# adicione o seu codigo python aqui\n'
	);

	function handleEnviaResposta() {
		alert('Deve enviar a reposta corretamente para o backend');
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