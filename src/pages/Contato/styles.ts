import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const ContatoContainer = styled.div`
  padding-top: 100px;
  height: 100%;
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

  
  

`; 

export const CampoContato = styled.div`

  
  margin: 100px auto;
  max-width: 1336px;
  
  width: 100%;
  background-color: #fff;
  width:1200px;
  height: 800px;

  

`;
export const CampoInfo = styled.div`


  background-color: ${themes.default.purble[300]};
  width:795px;
  height: 136px;
  


`;

export const ActionsLogin = styled.div``;