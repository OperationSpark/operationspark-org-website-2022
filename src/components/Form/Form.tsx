import { FormEvent, FormEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { motion, MotionProps } from 'framer-motion';

const FormStyles = styled(motion.form)`
  display: flex;
  flex-flow: column;
  width: 100%;
  transition: 200ms;
  .form-error {
    display: flex;
    align-items: center;
    user-select: none;
    color: ${({ theme }) =>
      theme.isLightMode ? theme.red[600] : theme.red[300]};
    p {
      padding-left: 0.5rem;
    }
  }
  @media print {
    display: none !important;
  }
`;

interface FormProps {
  children?: ReactNode | ReactNode[];
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  formProps?: MotionProps;
  className?: string;
}

const Form = ({ children, onSubmit, formProps, className }: FormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };
  return (
    <FormStyles
      autoComplete='off'
      className={className}
      onSubmit={handleSubmit}
      {...(formProps || {})}
    >
      {children}
    </FormStyles>
  );
};

export default Form;
