import styled from 'styled-components';

export const TurmaNovaContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1336px;
  width: 100vw;
  height: 100vh;
  margin: auto;
  margin-top: 132px;

  h1 {
    font-size: 32px;
    padding-left: 16px;
  }

  form {
    padding: 0 200px;
  }
`;

export const ListaProblemas = styled.div`

  margin-top: 10px;
  
`;

export const ProblemaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  
  margin-bottom: 24px;
`;

export const ProblemaInfo = styled.div`
  p {
    margin-bottom: 8px;
  }
`;

export const ProblemaActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ProblemasAdicionados = styled.div`
  height: calc(90px);
  overflow-y: scroll;
  p {
    
  }
  
`;