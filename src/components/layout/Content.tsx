import styled from 'styled-components';

export const Content = styled.div.attrs(({ className }) => ({
  className: ['__content-container', className].filter(Boolean).join(' '),
}))`
  max-width: calc(4vw + 1200px);
  width: 100%;
  margin: 0 auto;
  padding: calc(0.8vw + 1.6rem);

  @media screen and (max-width: 768px) {
    padding: calc(0.8vw + 0.8rem);
  }
`;

export default Content;
