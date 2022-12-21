import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

type FormPageProps = {
  children: ReactNode | ReactNode[];
  page: number;
  currentPage: number;
};

const FormPage: FC<FormPageProps> = ({ children, page, currentPage }) => {
  return (
    <AnimatePresence mode='wait'>
      {page === currentPage && <FormPageStyles>{children}</FormPageStyles>}
    </AnimatePresence>
  );
};

export default FormPage;

const FormPageStyles = styled(motion.div)``;
