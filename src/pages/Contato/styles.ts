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
  border: 1px solid white;
  margin: 0 auto;
  margin-top: 100px;
  max-width: 1336px;
  
  
  width: 100%;
  background-color: #fff;
  width:1200px;
  height: 800px;
  position: relative;
  display: block;
  
  

  

`;
export const CampoInfo = styled.div`


  background-color: ${themes.default.purble[300]};
  width:795px;
  
  height: 136px;
  margin: 0 auto;
  margin-top: 50px;

  width:795px;
  height: 136px;

  p {
    font-family: 'Poppins', sans-serif;
    padding: 50px 15px 0px 15px;
    font-size: 20px;
  }
  
  
  


`;
export const CampoForm = styled.div`


  
  width:795px;
  
  height: 500px;
  margin: 0 auto;
  margin-top: 50px;



  
  .form {
    width: 100%;
    max-width: 32rem;
    font-size: 1.125rem;
  }

  .form {
    width: 100%;
    max-width: 32rem;
    font-size: 1.125rem;
    margin: 0 auto;
  }
  
  .form label,
  .form input,
  .form textarea,
  .form button {
    display: block;
    width: 100%;
  }
  
  .form label {
    color: #000;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .form input,
  .form textarea {
    background-color: #E2E8F0;
    font: inherit;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 8px;
    transition: border-color, box-shadow 0.2s;
  }
  
  .form textarea {
    min-height: 13rem;
    resize: vertical;
  }
  
  .form input:hover,
  .form input:focus,
  .form textarea:hover,
  .form textarea:focus {
    outline: none;
    border-color: #09d;
    box-shadow: 0 0 0 3px #4dc8ff;
  }
  
  .form button {
    margin-left: 15px;
    display: block;
    padding: 1rem;
    background: #0072c4;
    color: #fff;
    font: inherit;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .form button:hover,
  .form button:focus {
    outline: none;
    background: #09d;
  }
  
  


`;


export const ActionsLogin = styled.div``;