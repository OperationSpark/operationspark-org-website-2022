import { MotionProps, motion } from 'framer-motion';
import { CSSProperties, FormEvent, FormEventHandler, KeyboardEvent, ReactNode } from 'react';
import styled from 'styled-components';

interface FormProps {
  children?: ReactNode | ReactNode[];
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  motionProps?: MotionProps;
  className?: string;
  style?: CSSProperties;
  onEnter?: (e: KeyboardEvent<HTMLFormElement>) => void;
}

const Form = ({ children, onSubmit, style, motionProps, className, onEnter }: FormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };
  return (
    <FormStyles
      autoComplete='off'
      className={className}
      onSubmit={handleSubmit}
      style={style}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.(e)}
      {...motionProps}
    >
      {children}
    </FormStyles>
  );
};

export default Form;

const FormStyles = styled(motion.form)`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  transition: 200ms;
  .form-error {
    display: flex;
    align-items: center;
    user-select: none;
    color: ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[300])};
    p {
      padding-left: 0.5rem;
    }
  }

  @media print {
    display: none !important;
  }
`;
