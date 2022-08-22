import styled from "styled-components";
import { motion } from "framer-motion";

export const AboutDiv = styled(motion.div)`
  width: clamp(50%, 700px, 90%);
  height: min(50%, 500px);
  background-color: gray;
  color: white;

  margin: auto;
  padding: 0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: auto;
    padding: 0 2rem;
    font-size: 1.3rem;
  }

  @media screen and (max-width: 768px) {
    height: max-content;
    p {
      font-size: 1.1rem;
      margin: 20px auto;
    }
  }
`;
