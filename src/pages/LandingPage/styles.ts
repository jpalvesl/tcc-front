import styled from 'styled-components';
import { themes } from '../../styles/themes';

export const LandingPageContainer = styled.div`
  max-width: 1336px;
  width: 100vw;
  height: 100vh;
  margin: auto;
  margin-top: 132px;

  .date {
    color ${themes.default.gray['800']};
  }

  .vertical-timeline-element--work a {
    text-decoration: underline;

    :hover {
      opacity: 0.7;
      transition 200ms;
    }
  }
`;

export const WellcomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-left: 16px;


  h1 {
    font-size: 40px;
    margin-bottom: 16px;
    font-family: 'Poppins', sans-serif;
  }

  p {
    font-size: 16px;
    margin-bottom: 60px;
    font-family: 'Poppins', sans-serif;
  }

  button {
    width: 400px;
    background-color: ${themes.default.green['500']};
    color: ${themes.default.white};

  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
