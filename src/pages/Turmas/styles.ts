import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const TurmasContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1336px;
  width: 100vw;
  height: 100vh;
  margin: auto;
`;

export const TurmasTitle = styled.h1`
  font-size: 32px;
  align-self: flex-start;
  padding-left: 16px;
  color: ${themes.default.neutral['700']};
`;

export const SearchRow = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0 16px;
  margin-bottom: 48px;

  gap: 8px;

  input {
    max-width: 80%;
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

export const TurmaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  
  margin-bottom: 24px;
`;

export const TurmaInfo = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  span {
    font-size: 16px;
    color: ${themes.default.gray['500']};
  }
`;

export const TurmaActions = styled.div`
  display: flex;
  gap: 8px;
`;

