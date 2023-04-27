import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const ProblemasContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1336px;
  width: 100vw;
  height: 100vh;
  margin: auto;
  margin-top: 132px;

  h1 {
    font-size: 32px;
    margin-left: 16px;
    margin-bottom: 32px;
  }
`;

export const SearchRow = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0 16px;
  margin-bottom: 48px;

  gap: 8px;

  input {
    max-width: 100%;
    background-color: ${themes.default.gray['800']};
    color: ${themes.default.gray['500']};

    ::placeholder {
      color: ${themes.default.gray['500']};
    }
  }

  button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${themes.default.gray['800']};
    color: ${themes.default.gray['500']};
    
    svg {
      font-size: 16px;
    }
  }
`;
