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

  p.turmasAluno {
    font-size: 22px;
    font-weight: bold;
  }

  p.instituicaoTitulo {
    font-size: 12px;
    color: ${themes.default.gray['500']};
  }

  h3.titulo {
    font-size: 24px;
  }

  p.label-titulo {
    font-size: 24px;
    color: ${themes.default.gray['500']};
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


  div.imagem{
    border-radius: 100%;
    overflow: hidden;
    padding: 8px;
    height:200px;
    width: 200px;
    margin: 0 auto;
    background: black;
    
  
  }

  div.imagem > img {
    width: 100%;
   
  }
  
  
  

  

  
  

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

export const ContainerTabs = styled.div`

  div.ant-tabs-nav-wrap {
    
  }

  div.ant-tabs-nav-list {
    backgroud-color: pink;
    margin:0 auto;
  }

  div.ant-tabs-ink-bar {
    background: #000;
  }
  
  
  

`;