import styled from 'styled-components';

import { SlashDivider } from '@this/components/Elements/SlashDivider';
import NavLink from '@this/components/Navbar/elements/NavLink';
import Icon from '@this/components/Elements/Icon';
import type { IconUrl } from '@this/components/Elements/Icon';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';

export const IconBtnCardStyles = styled.div`
  padding: 1rem;
  :first-child {
    padding-left: 0;
  }
  :last-child {
    padding-right: 0;
  }
  .card-main {
    background: ${({ theme }) => theme.alpha.bg};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${({ theme }) => theme.fg};
    overflow: hidden;
    border-radius: 0.25rem;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    ${cardShadow}
  }
  .card-content {
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .card-img img {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
  .info {
    width: fit-content;
  }
  .card-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .card-pre-title {
      color: ${({ theme }) =>
        theme.isLightMode ? theme.primary[900] : theme.primary[200]};
      font-weight: 300;
      font-style: italic;
    }
  }
  .card-description {
    padding: 1rem 0;
  }
  .icon-btn-title {
    font-weight: 900;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`;

export interface IconBtnCardProps {
  icon: IconUrl;
  preTitle: string;
  title: string;
  description: string;
  buttonUrl: string;
  buttonText: string;
}

const IconBtnCard = ({
  icon,
  title,
  preTitle,
  description,
  buttonText,
  buttonUrl,
}: IconBtnCardProps) => {
  return (
    <IconBtnCardStyles>
      <div className='card-main'>
        <div className='card-content'>
          <div className='card-top'>
            <div className='card-title'>
              <div className='card-pre-title'>{preTitle}</div>
              <h2 className='dynamic-h2 icon-btn-title'>{title}</h2>
            </div>
            <div className='card-img'>
              <Icon icon={icon} />
            </div>
          </div>
          <p className='card-description dynamic-txt'>{description}</p>
          <NavLink href={buttonUrl} className='info' color='yellow'>
            {buttonText}
          </NavLink>
        </div>
        <SlashDivider style={{ borderBottom: 'none' }} />
      </div>
    </IconBtnCardStyles>
  );
};

export default IconBtnCard;
