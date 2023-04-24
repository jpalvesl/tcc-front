import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const HomeContainer = styled.div`

  padding-top: 100px;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  background-color: ${themes.default.gray['100']};
  
  
`;

export const BemVindoUser = styled.div`

  height: 316px;
  display: flex;

  
  
`;

export const BannerBemVindo = styled.div`
  height: 316px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
`;

export const MensagemBemVindo = styled.div`
  
  height: 316px;
  width: 50%;

  p.titulo {
    font-size: 32px;
    color: ${themes.default.gray['900']};
    margin-top: 70px;
    font-family: 'Poppins', sans-serif;
  }
  p {
    font-size: 24px;
    color:${themes.default.gray['900']};
    margin-top: 15px;
    font-family: 'Poppins', sans-serif;
    justify-content: space-between;

  }
`;

export const InfoSobreSistema = styled.div`
  height: 420px;
  display: flex;

  
`;

export const BannerInfo = styled.div`
  height: 420px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const MensagemInfo = styled.div`
  height: 420px;
  width: 50%;

  p.titulo {
    font-size: 32px;
    color: ${themes.default.gray['900']};
    margin-top: 70px;
    font-family: 'Poppins', sans-serif;
  }
  p {
    font-size: 24px;
    color:${themes.default.gray['900']};
    margin-top: 15px;
    font-family: 'Poppins', sans-serif;
    justify-content: space-between;

  }
  
`;

export const AreaAtividades = styled.div`

  padding-bottom: 50px;
 


  h3{
    height: 30px;
    font-size: 24px;
    color:${themes.default.gray['900']};
    font-family: 'Poppins', sans-serif;

  }

  p.atividades{
    padding-top: 10px;
    
    
  }

  p.titulo{
    font-size: 24px;
    color:${themes.default.gray['900']};
    font-family: 'Poppins', sans-serif;
    margin-top: 20px;
  }


  
`;

export const TarefaRow = styled.div`

justify-content: space-between;
  

  
`;

