import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ImgDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.body};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImgSvg = styled(motion.img)`
  width: 300px;
  height: 300px;
  z-index: 1;
`;
