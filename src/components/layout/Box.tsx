import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface BoxProps {
  children?: ReactNode;
  style?: CSSProperties;
  motionProps: MotionProps;
}

export const Box = ({ children, motionProps, style }: BoxProps) => {
  return (
    <BoxStyles style={style} {...motionProps}>
      {children}
    </BoxStyles>
  );
};

export const BoxStyles = styled(motion.div)`
  box-sizing: border-box;
`;
