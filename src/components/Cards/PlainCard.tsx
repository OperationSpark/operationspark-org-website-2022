import { SlashDivider } from '@this/components/Elements/SlashDivider';
import {
  cardShadow,
  cardShadowLtr,
  cardShadowRtl,
  cardShadowSub1,
} from '@this/src/theme/styled/mixins/shadows';
import { ReactNode } from 'react';
import styled from 'styled-components';

type PlainCardProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  shadow?: 'alternate' | 'subtle' | 'none';
  noDivider?: boolean;
  id?: string;
  animate?: boolean;
};

const PlainCard = ({ children, className, shadow, id, noDivider, animate }: PlainCardProps) => {
  return (
    <PlainCardStyles className={`${className ?? ''} ${shadow || 'default'}`} id={id}>
      <div className='plain-card-body'>{children}</div>
      {!noDivider ? <SlashDivider style={{ borderBottom: 'none' }} animate={animate} /> : null}
    </PlainCardStyles>
  );
};

export default PlainCard;

const PlainCardStyles = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 0.5rem;
  overflow: hidden;
  .plain-card-body {
    padding: 1.5rem;
  }

  &.subtle {
    ${cardShadowSub1}
  }

  &.default {
    ${cardShadow}
  }

  &.alternate {
    :nth-of-type(odd) {
      ${cardShadowRtl}
    }
    :nth-of-type(even) {
      ${cardShadowLtr}
    }
  }
`;
