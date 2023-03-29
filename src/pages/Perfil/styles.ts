import styled from 'styled-components';
import { themes } from '../../styles/themes';


export const PerfilContainer = styled.div`
  padding-top: 100px;
  height: 100%;
  max-width: 1336px;
  margin: 0 auto;
  width: 100%;

  display: block;

  h2 {
    
    
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
export const CabecalhoPerfil = styled.div`

  
  
  width: 1336px;
  height: 300px;
  display: flex;

  
  

  
  

`; 
export const ConteudoPerfil = styled.div`

  
  height: 100%;

  
  display: flex;
  
  justify-content: center;

  h3.turmasAluno {
    font-size: 22px;
  }

  
  
  

`; 
export const CampoFoto = styled.div`

  width: 250px;
  height: 300px;
  
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  
  
  

  

  
  

`; 
export const CampoInfo = styled.div`

  width: 1086px;
  height: 300px;
  
  display: inline-block;

  p.nomeUsuario{
    padding: 50px 0px 0px 20px; 
    
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    width: 543px;
  }

  p.instituicao{
    padding: 30px 0px 0px 20px; 
    
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
  }

  p.problemas{
    padding: 20px 0px 0px 20px; 
    
    font-family: 'Poppins', sans-serif;
    
    height: 50px;
   
    width: 543px;
    font-size: 20px;

  }
  
  

`;