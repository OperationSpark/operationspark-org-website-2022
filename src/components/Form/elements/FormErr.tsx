import { motion, MotionStyle } from 'framer-motion';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';

const FormErrStyles = styled(motion.div)`
  display: flex;
  align-items: center;
  user-select: none;
  color: ${({ theme }) => theme.red[theme.isLightMode ? 600 : 300]};
  &.light {
    color: ${({ theme }) => theme.red[300]};
  }
  &.dark {
    color: ${({ theme }) => theme.red[600]};
  }
  p {
    padding-left: 0.5rem;
  }
`;

interface FormErrProps {
  text: string;
  style?: MotionStyle;
  colorTheme?: 'light' | 'dark';
}
const FormErr = ({ text, style, colorTheme }: FormErrProps) => {
  return (
    <FormErrStyles style={style} className={colorTheme} data-test-id='form-error'>
      <AiOutlineInfoCircle /> <p>{text}</p>
    </FormErrStyles>
  );
};

export default FormErr;
