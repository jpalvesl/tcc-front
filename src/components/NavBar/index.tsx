import { QuestionCircleOutlined } from '@ant-design/icons';
import { HeaderContainer, Actions, Action, UserActions, UserIcon } from './styles';
import { themes } from '../../styles/themes';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export const NavBar = () => {
	const { signed } = useContext(AuthContext);
	return (
		<HeaderContainer>
			<Actions>

				<Action to='/'>
					<QuestionCircleOutlined style={{ fontSize: 40, color: themes.default.white }} />
				</Action>
				<Action to='/problema'>Problemas</Action>
				<Action to='/contato'>Contato</Action>
				<Action to='/sobre'>Sobre</Action>
				{signed? (
					<>
						<Action to='/turma'>Turma</Action>
						<Action to='/tarefas'>Tarefa</Action>
					</>
					
				): null}
			</Actions>


			<UserActions>
				<UserIcon />
			</UserActions>
		</HeaderContainer>
	);
};

