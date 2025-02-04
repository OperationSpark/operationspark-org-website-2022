import { FC } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

type NeumorphismListCardProps = {
  title: string;
  Icon: IconType;
  items: string[];
  color?: 'auto' | 'blue' | 'primary' | 'magenta' | 'green';
};

const NeumorphismListCard: FC<NeumorphismListCardProps> = ({ title, Icon, items, color }) => {
  const colorClassName = color === 'auto' ? ' _color-auto' : color ? ` _color-${color}` : '';

  return (
    <NeumorphismListCardStyles className={`_neu-card${colorClassName}`}>
      <div className='_neu-card-icon'>
        <Icon fontSize='1em' />
      </div>
      <h2 className='_neu-card-title'>{title}</h2>
      <ul className='_neu-card-list'>
        {items.map((item, i) => (
          <li key={item + i} className='_new-card-list-item'>
            {item}
          </li>
        ))}
      </ul>
    </NeumorphismListCardStyles>
  );
};

export default NeumorphismListCard;

const NeumorphismListCardStyles = styled.div`
  flex: 1 1 46%;
  display: flex;
  flex-flow: column;
  align-items: center;
  min-width: 300px;
  padding: 1rem;
  box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.25)};
  border-radius: 1rem;
  background: ${({ theme }) => theme.rgb('fg', 0.05)};
  --color: ${({ theme }) => theme.asRgb('fg', theme.isLightMode ? 10 : -10)};

  &._color-auto:nth-child(1n),
  &._color-blue {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('blue', 0.5, 1)};
    background: ${({ theme }) => theme.rgb('blue', 0.1)};
    --color: ${({ theme }) => theme.asRgb('blue')};
  }

  &._color-auto:nth-child(2n),
  &._color-primary {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('primary', 0.5)};
    background: ${({ theme }) => theme.rgb('primary', 0.1)};
    --color: ${({ theme }) => theme.asRgb('primary', 4)};
  }

  &._color-auto:nth-child(3n),
  &._color-magenta {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('magenta', 0.5)};
    background: ${({ theme }) => theme.rgb('magenta', 0.1)};
    --color: ${({ theme }) => theme.asRgb('magenta')};
  }

  &._color-auto:nth-child(4n),
  &._color-green {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('green', 0.5, -8)};
    background: ${({ theme }) => theme.rgb('green', 0.1, 10)};
    --color: ${({ theme }) => theme.asRgb('green', -6)};
  }

  ._neu-card-title {
    font-size: 2rem;
    font-weight: 900;
    color: rgba(var(--color), 1);
  }
  ._neu-card-icon {
    display: flex;
    font-size: 4rem;
    color: ${({ theme }) => theme.rgb('bg')};
    filter: drop-shadow(0 0 4px rgba(var(--color), 1));
  }
  ._neu-card-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    margin: 0;
    margin-top: 1rem;
    flex: 1;
    justify-content: space-between;

    padding: 1rem;
    box-shadow: -0.125rem 0.125rem 0.75rem 0px inset rgba(var(--color), 0.35),
      0px 0px 0px 2px ${({ theme }) => theme.rgb('bg', 1)},
      -0.125rem 0.125rem 0.5rem 1px rgba(var(--color), 0.5);
    border-radius: 1rem;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    li {
      font-size: 1rem;
      font-weight: 400;
      padding: 0.5rem;
      border-radius: 0.5rem;
      width: fit-content;
      max-width: calc(100% - 3rem);
      background: ${({ theme }) => theme.rgb('bg', 0.75)};
      box-shadow: 0 0 3px 1px inset rgba(var(--color), 0.5);
      color: ${({ theme }) => theme.rgb('fg', 0.9)};
      &:nth-child(even) {
        margin-left: auto;
      }
      &:nth-child(odd) {
        margin-right: auto;
      }
    }
  }
`;
