import styled from 'styled-components';

import { buttonCss, yellowBtn } from '@this/src/theme/styled/mixins/button';

const Button = styled.button.attrs(
  ({ color = '' }: { color: '' | 'yellow' }) => ({ color }),
)`
  ${({ color }) => (color === 'yellow' ? yellowBtn : buttonCss)};
  user-select: none !important;
  -webkit-user-drag: none !important;
`;

export default Button;
