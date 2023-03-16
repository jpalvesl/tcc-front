import { QuestionCircleOutlined } from '@ant-design/icons';
import { HeaderContainer, Actions, Action, UserActions, UserIcon } from './styles';
import { themes } from '../../styles/themes';

export const NavBar = () => {
	return (
		<HeaderContainer>
			<Actions>

				<Action to='/'>
					<QuestionCircleOutlined style={{ fontSize: 40, color: themes.default.white }} />
				</Action>
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

