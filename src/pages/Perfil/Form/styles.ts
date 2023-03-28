import styled from 'styled-components';
import { themes } from '../../../styles/themes';

export const PerfilContainer = styled.div`
  padding-top: 100px;
  height: 100%;
  
  max-width: 1336px;
  margin: 0 auto;
  width: 100%;
  

  

  h2 {
    
    
    font-size: 32px;
    margin-top: 16px;
    margin-bottom: 64px;
    font-family: 'Poppins', sans-serif;
    line-height: 48px;
    color: ${themes.default.gray['900']};
    width: 1336px;
    
    
  }
  div.container {
    display:flex;
    backgrond-color:blue;
  }

  
  

`; 



export const CampoImage = styled.div`

  width: 30%;
  
  

  display: flex;
  flex-direction: column;


  

  div.imagem{
    padding: 8px;
    height:150px;
  
  }
  
  
  
  

  
  
  

  

  
  

`; 
export const CampoForm = styled.div`
  
  width: 70%;
  

  
  
  

  

  
  

`;