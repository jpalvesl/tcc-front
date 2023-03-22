import styled from 'styled-components';

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F3F3F3;
  box-shadow: 6px 0px 4px rgba(0, 0, 0, 0.25);
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
    line-height: 72px;
  }
`;

export const ContainerLogin = styled.div`
width: 50%;
padding: 16px 32px 0 32px;

h2 {
  font-size: 32px;
  margin-top: 16px;
  margin-bottom: 64px;
}

p {
  text-align: center;
  font-size: 24px;
  color: #1f2937;

  a {
    color: #2563eb;
  }
}
`;

export const ActionsLogin = styled.div``;