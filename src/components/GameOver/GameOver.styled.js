import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GameOverDiv = styled(motion.div)`
  width: clamp(50%, 700px, 90%);
  height: min(50%, 300px);
  background-color: #1b5c3e;
  color: white;

  margin: auto;
  padding: 0 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    display: flex;
    height: 500px;
    color: white;
    margin: 30px auto;
    padding: 0 2rem;
    align-items: center;
  }
`;

export const ButtonsWrap = styled(motion.div)`
  display: flex;
  width: 450px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
