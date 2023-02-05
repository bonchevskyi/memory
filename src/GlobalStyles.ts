import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { Props } from 'types';

const GlobalStyles = createGlobalStyle`
*{
  font-family: 'Kaushan Script', sans-serif;
  margin: 0;
  padding: 0;  
  box-sizing: border-box;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
  width: 0vw;
}
 
}

body{
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor}; 
  font-size: 1.5em;
}
`;

export const GlobalWrap = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 3rem;
  width: clamp(500px, 700px, 90vw);
  max-width: 100vw;
  height: 400px;
  height: fit-content;
  margin: 0 auto;
  position: relative;
  padding: 0;
  margin-bottom: 0;
  margin-top: 3rem;

  h1 {
    margin: 20px auto;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    margin-top: 1rem;
  }
`;

export const HeaderDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  left: 1rem;
  padding: 0;

  h1 {
    display: inline-block;
    padding: 0;
    margin: 0 auto;
    &:first-letter {
      color: #1b5c3e;
    }
  }
`;

export const Btn = styled(motion.button)<Props>`
  background: none;
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(props) => props.theme.fontColor};
  padding: 6px 12px;
  border-radius: 4px;
  color: ${(props) => props.theme.fontColor};
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  margin: 10px 5px;

  &:hover {
    background: ${(props) => (props.hoverColor ? props.hoverColor : 'none')};
  }
`;

export const ModalButton = styled(motion.button)<Props>`
  background: none;
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  padding: 6px 12px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  margin-top: auto;
  margin-bottom: 1rem;
  bottom: 0;

  &:hover {
    background: ${(props) => (props.hoverColor ? props.hoverColor : 'none')};
  }
`;

export const Scoreboard = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: center;

  p {
    border: 3px solid ${(props) => props.theme.fontColor};
    border-radius: 50px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    width: 220px;
    width: 9rem;
    padding: 0.5rem;
    margin-right: 10px;
    color: ${(props) => props.theme.fontColor};
    @media screen and (max-width: 768px) {
      width: 9rem;
    }
  }
`;

export const GameDiv = styled(motion.div)`
  margin: 0 auto;
  margin-bottom: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Grid = styled(motion.section)`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 10px;
  max-width: 100vw;
  width: fit-content;

  &.four {
    grid-template-columns: repeat(4, auto);
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(4, auto);
    }
  }

  &.six {
    grid-template-columns: repeat(6, auto);
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(4, auto);
    }
  }

  &.eight {
    grid-template-columns: repeat(8, auto);
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(4, auto);
    }
  }
`;

export const ThemeIcon = styled(motion.button)`
  cursor: pointer;
  background: transparent;
  top: 0px;
  right: 0px;
  z-index: 0;
  border: none;
  font-size: 3rem;
`;

export const IconsBar = styled(motion.div)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: flex-start;
  position: relative;
  background: transparent;
  top: 0px;
  right: 0px;

  border: 1px solid white;
  border-radius: 100px;
  border: none;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Footer = styled(motion.div)`
  margin: 0 auto;
  position: fixed;
  font-size: small;
  background: transparent;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border: none;

  a,
  a:hover,
  a:visited,
  a:active {
    color: inherit;
    text-decoration: none;
    display: flex;
  }
`;

export default GlobalStyles;
