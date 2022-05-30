import { motion, MotionStyle } from 'framer-motion';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';

const FormErrStyles = styled(motion.div)`
  display: flex;
  align-items: center;
  user-select: none;
  color: ${({ theme }) => theme.red[theme.isLightMode ? 600 : 300]};
  p {
    padding-left: 0.5rem;
  }
`;

interface FormErrProps {
  text: string;
  style?: MotionStyle;
}
const FormErr = ({ text, style }: FormErrProps) => {
  return (
    <FormErrStyles style={style}>
      <AiOutlineInfoCircle /> <p>{text}</p>
    </FormErrStyles>
  );
};

export default FormErr;
