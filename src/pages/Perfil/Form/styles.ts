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
    border-radius: 100%;
    overflow: hidden;
    
    height:250px;
    width: 250px;
    margin: 0 auto;
    
    
  
  }

  div.imagem > img {
    border-radius: 100%;
    height:250px;
    width: 250px;
   
  }
  
  div.formImg {
    width: 250px;
    margin: 0 auto;
  }
  
  
  

  
  
  

  

  
  

`; 
export const CampoForm = styled.div`
  
  width: 70%;
  a {
    color: ${themes.default.blue['600']};
  }

  
  
  

  

  
  

`;

export const CampoFormSenha = styled.div`
  
  width: 70%;
  margin: 0 auto;
  a {
    color: ${themes.default.blue['600']};
  }

  
  
  

  

  
  

`;