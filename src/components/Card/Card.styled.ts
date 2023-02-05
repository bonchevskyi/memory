import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardMain = styled(motion.div)`
  position: relative;
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
  border: none;

  .flipped & {
    transform: rotateY(0deg);
    background-color: transparent;
    transition-delay: 0.2s;
  }
`;

export const CardBack = styled(motion.img)`
  transition: all ease-in 0.2s;
  transition-delay: 0.2s;
  background: linear-gradient(15deg, green, gray);

  .flipped & {
    transform: rotateY(90deg);
    transition-delay: 0s;
  }
`;
