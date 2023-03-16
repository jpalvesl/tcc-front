import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const SobreContainer = styled.div`
  padding-top: 100px;
   
  max-width: 1336px;
  margin: 0 auto;
  width: 100%;
  background-color: ${themes.default.gray['100']};

  h2 {
    position: absolute;
    font-size: 32px;
    margin-top: 16px;
    margin-bottom: 64px;
    font-family: 'Poppins', sans-serif;
    line-height: 48px;
    color: ${themes.default.gray['900']};
    width: 1336px;
    width:100%
  }

  p.titulo {
    height:50px;
    font-size: 24px;
    color: ${themes.default.gray['900']};

    margin-top: 64px;
    padding: 32px;
    font-family: 'Poppins', sans-serif;
   
    
  
  }
  
  p.texto {
    
    line-height: normal; 
    font-size: 24px;
    color: ${themes.default.gray['900']};

    margin-top: 64px;
    padding: 32px;
    font-family: 'Poppins', sans-serif;
   
  
  }

  ul{
    list-style: decimal;
    line-height: normal; 
    list-style-position: inside;
    font-size: 24px;
    color: ${themes.default.gray['900']};

    margin-top: 50px;
    padding: 32px;
    font-family: 'Poppins', sans-serif;
   
  }

  hr {
    border-style: groove;
  }
  

`; 

export const ActionsLogin = styled.div``;