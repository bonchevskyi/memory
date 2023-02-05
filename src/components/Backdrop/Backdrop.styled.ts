import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackdropDiv = styled(motion.div)`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000000e1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default BackdropDiv;
