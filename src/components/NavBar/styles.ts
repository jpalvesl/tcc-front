import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { themes } from '../../styles/themes';


export const HeaderContainer = styled.nav`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${themes.default.gray['900']};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const Action = styled(Link)`
  font-size: 28px;
  color: ${themes.default.white};
  text-decoration: none;
`;

export const UserActions = styled.div``;

export const UserIcon = styled(UserOutlined)`
  font-size: 40px;
  color: ${themes.default.white};
`;