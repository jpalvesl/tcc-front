import { QuestionCircleOutlined } from '@ant-design/icons';
import { HeaderContainer, Actions, Action, UserActions, UserIcon } from './styles';
import { themes } from '../../styles/themes';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { SignActions } from '../SignActions';
import { UserIconComponent } from '../UserIconComponent';

export const NavBar = () => {
	const { signed } = useContext(AuthContext);
	return (
		<HeaderContainer>
			<Actions>

				<Action to='/'>
					<QuestionCircleOutlined style={{ fontSize: 40, color: themes.default.white }} />
				</Action>
				<Action to='/problema' className='problemas'>Problemas</Action>
				<Action to='/contato' className='contato'>Contato</Action>
				<Action to='/sobre' className='sobre'>Sobre</Action>
				{signed? (
					<>
						<Action to='/turma' className='turma'>Turma</Action>
						<Action to='/tarefas' className='tarefas'>Tarefa</Action>
					</>
					
				): null}
			</Actions>


			<UserActions>
				{signed
					? <UserIconComponent />
					: <SignActions />}
			</UserActions>
		</HeaderContainer>
	);
};

