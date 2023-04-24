import styled from 'styled-components';
import { themes } from '../../styles/themes';


export const TarefasContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1336px;
  width: 100vw;
  height: 100vh;
  margin: auto;
  margin-top: 132px;

  h1 {
    font-size: 32px;
    color: ${themes.default.neutral['700']};
    padding: 0 16px;
  }
`;

export const TarefasTitle = styled.h1`
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

export const ContentContainer = styled.div`
  padding: 0 16px;
`;

export const ProvasSection = styled.section`
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }


  td {
    background-color: ${themes.default.zinc['100']} !important;
  }

  th {
    background-color: ${themes.default.zinc['100']} !important;
  }
`;

export const RoteirosSection = styled.section`
  margin-bottom: 24px;
  
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  td {
    background-color: ${themes.default.zinc['100']} !important;
  }

  th {
    background-color: ${themes.default.zinc['100']} !important;
  }
`;

