import styled from 'styled-components';
import { VStack } from '@chakra-ui/layout';

export const FooterStyles = styled.footer`
  padding: 0;
  @media print {
    text-align: center;
  }
`;

export const InfoSessionStyles = styled(VStack)`
  background: ${({ theme }) => theme.primary[600]};
  position: relative;
  padding: 2rem 0;
  box-shadow: 0 -0.25rem 0.5rem rgba(25, 25, 25, 0.25);
  @media print {
    display: none;
    * {
      display: none;
    }
  }
`;

export const SupportersStyles = styled(VStack)`
  img,
  a {
    user-select: none;
    -webkit-user-drag: none;
  }
`;
