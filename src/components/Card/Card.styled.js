import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardMain = styled(motion.div)`
  position: relative;
  //max-width: 200px;
  margin: 0 auto;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const CardFront = styled(motion.img)`
  width: 100%;
  transform: rotateY(90deg);
  transition: all ease-in 0.2s;
  position: absolute;
  //border: 2px solid white;
  //border: 2px solid #1b5c3e;
  border: none;

  .flipped & {
    transform: rotateY(0deg);
    background-color: transparent;
    transition-delay: 0.2s;
  }
  /* //background-color: #fff;
  border-radius: 5px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 2; */
`;

export const CardBack = styled(motion.img)`
  transition: all ease-in 0.2s;
  transition-delay: 0.2s;
  background: linear-gradient(15deg, green, gray);
  //background: green;
  //width: 300px;
  //height: 300px;

  .flipped & {
    transform: rotateY(90deg);
    transition-delay: 0s;
  }
  /* border-radius: 5px;
  
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
`;
