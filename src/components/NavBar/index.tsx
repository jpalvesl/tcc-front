import { QuestionCircleOutlined } from '@ant-design/icons';
import { HeaderContainer, Actions, Action, UserActions, UserIcon } from './styles';

export const NavBar = () => {
	return (
		<HeaderContainer>
			<Actions>

				<QuestionCircleOutlined style={{ fontSize: 40, color: '#fff' }} />
				<Action to='/problema'>Problemas</Action>
				<Action to='/contato'>Contato</Action>
				<Action to='/sobre'>Sobre</Action>
			</Actions>


			<UserActions>
				<UserIcon />
			</UserActions>
		</HeaderContainer>
	);
};

