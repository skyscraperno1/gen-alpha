import styled from 'styled-components';
import { motion } from 'framer-motion';
export const ButtonWrapper = styled(motion.button)`
  position: relative;
  background: transparent;
  height: 38px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    position: relative;
    z-index: 10;
  }

  &::before {
    content: '';
    position: absolute;
    cursor: pointer;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease;
    border: 1px solid black;
    border-radius: 70px;
  }

  &:hover::before {
    transform: scale(1.1);
  }

  &:active::before {
    transform: scale(1);
  }
`