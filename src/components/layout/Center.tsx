import styled from 'styled-components';
import { motion } from 'framer-motion';

const LRCFlex = {
  align: {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  },
  justify: {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  },
};

type CenterProps = {
  align?: 'top' | 'center' | 'bottom';
  justify?: 'left' | 'center' | 'right';
  direction?: 'row' | 'column';
  wrap?: 'wrap' | 'nowrap';
};
/**
 * @example
 * <Center // Default Props
 *   align='center'   // 'top'  | 'center' | 'bottom'
 *   justify='center' // 'left' | 'center' | 'right'
 *   direction='row'  // 'row'  | 'column'
 *   wrap='nowrap'    // 'wrap' | 'nowrap'
 * >
 *   <span>Default Props</span>
 * </Center>
 */
export const Center = styled(motion.div)<CenterProps>`
  display: flex;
  flex-flow: ${({ direction, wrap }) => `${direction ?? 'row'} ${wrap || 'nowrap'}`};
  width: 100%;
  height: 100%;
  justify-content: ${({ justify }) => LRCFlex.justify[justify ?? 'center']};
  align-items: ${({ align }) => LRCFlex.align[align ?? 'center']};
`;
