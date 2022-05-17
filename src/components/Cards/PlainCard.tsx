import { ReactNode } from 'react';
import styled from 'styled-components';
import {
  cardShadow,
  cardShadowLtr,
  cardShadowRtl,
} from '@this/src/theme/styled/mixins/shadows';
import { SlashDivider } from '@this/components/Elements/SlashDivider';

const PlainCardStyles = styled.div`
  border-radius: 0.25rem;
  overflow: hidden;
  .plain-card-body {
    padding: 1.5rem;
  }
  ${cardShadow}
  &.alternate {
    :nth-of-type(odd) {
      ${cardShadowRtl}
    }
    :nth-of-type(even) {
      ${cardShadowLtr}
    }
  }
`;

interface PlainCardProps {
  children: ReactNode | ReactNode[];
  className?: string;
  shadow?: 'alternate';
  id?: string;
}

const PlainCard = ({ children, className, shadow, id }: PlainCardProps) => {
  return (
    <PlainCardStyles className={`${className} ${shadow || ''}`} id={id}>
      <div className='plain-card-body'>{children}</div>
      <SlashDivider style={{ borderBottom: 'none' }} />
    </PlainCardStyles>
  );
};

export default PlainCard;
