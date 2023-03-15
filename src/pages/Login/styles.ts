import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const LoginContainer = styled.div`
  padding-top: 100px;
  height: 100%;
  display: flex;
  max-width: 1336px;
  margin: 0 auto;
  width: 100%;
`;

export const ChamadaContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${themes.default.orange['100']};
`;

export const ChamadaImage = styled.div`
  padding: 8px;
  svg {
    width: 100%;
  }
`;

export const ChamadaTexto = styled.p`
  margin-top: 64px;
  padding: 32px;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  line-height: 48px;

  strong {
    font-size: 40px;
  }
`;

export const ContainerRegistro = styled.div`
  width: 50%;
`;

export const ActionsLogin = styled.div``;

export const FormLogin = styled.div``;