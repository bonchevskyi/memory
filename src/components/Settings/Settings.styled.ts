import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SettingsDiv = styled(motion.div)`
  width: clamp(50%, 700px, 90%);
  height: min(50%, 500px);
  background-color: coral;
  color: white;
  margin: auto;
  padding: 0 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    padding: 1rem 0;
  }

  @media screen and (max-width: 768px) {
    height: max-content;
  }
`;

export const GridDiv = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  width: clamp(50%, 700px, 90%);
  height: fit-content;
  color: white;
  margin: auto;
  padding: 0 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto;
    margin: 20px auto;
  }
`;

export const SetDiv = styled(motion.div)`
  width: 200px;
  width: clamp(50%, 200px, 100%);
  height: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding: 1rem;
    text-align: center;
    background-color: black;
    border-radius: 12px;
    min-width: 200px;
  }

  @media screen and (max-width: 768px) {
    margin: 10px auto;
  }

  .radio-label {
    display: flex;
    align-items: center;
    border-radius: 100px;
    padding: 14px 16px;
    margin: 5px 0;
    cursor: pointer;
    transition: 0.3s;
  }

  .radio-label:hover,
  .radio-label:focus-within {
    background: rgba(40, 40, 40, 0.5);
  }

  .radio-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
    z-index: -1;
  }

  .radio-design {
    width: 22px;
    height: 22px;
    border-radius: 100px;

    background: black;
    position: relative;
  }

  .radio-design::before {
    content: '';
    display: inline-block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: white;
    transform: scale(1.1);
    transition: 0.3s;
  }

  .radio-input:checked + .radio-design::before {
    transform: scale(0);
  }

  .radio-text {
    color: black;
    margin-left: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 900;

    transition: 0.3s;
  }

  .radio-input:checked ~ .radio-text {
    color: white;
  }
`;
