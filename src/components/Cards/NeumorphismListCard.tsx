import { FC, ReactNode } from 'react';
import styled, { CSSProperties, keyframes } from 'styled-components';

type NeumorphismListCardProps = {
  id?: string;
  title: string;
  Icon?: FC | FC[];
  items: ReactNode[];
  subtitle?: string;
  /** Card color. default: none */
  color?: 'auto' | 'blue' | 'primary' | 'secondary' | 'magenta' | 'red' | 'yellow' | 'green';
  /** Rotate card color. default: false -- pass number (in seconds) to adjust transition */
  hueRotate?: boolean;
  width?: string;
  maxWidth?: string;
  /** stretch with or fit content */
  fit?: boolean | number;
  /** center card content -- Default: alternate left/right */
  center?: boolean;
  style?: CSSProperties;
  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
};

const NeumorphismListCard: FC<NeumorphismListCardProps> = ({
  id,
  title,
  subtitle,
  Icon,
  items,
  color,
  fit,
  hueRotate,
  width,
  maxWidth,
  center,
  style,
  listStyle,
  itemStyle,
}) => {
  const colorClassName = color === 'auto' ? ' _color-auto' : color ? ` _color-${color}` : '';
  const hueRotateClassName = hueRotate ? ' _color-rotate' : '';
  return (
    <NeumorphismListCardStyles
      id={id}
      className={`_neu-card${colorClassName}${hueRotateClassName}`}
      style={
        fit
          ? { ...style, maxWidth: maxWidth ?? 'fit-content', width }
          : { ...style, width, maxWidth }
      }
      time={typeof hueRotate === 'number' ? hueRotate : undefined}
    >
      {Icon && (
        <div className='_neu-card-icon'>
          {Array.isArray(Icon) ? Icon.map((Icn, index) => <Icn key={index} />) : <Icon />}
        </div>
      )}
      <h2 className='_neu-card-title'>{title}</h2>
      {subtitle && <h2 className='_neu-card-subtitle'>{subtitle}</h2>}
      {items.length === 1 ? (
        <div className='_neu-card-single-item' style={itemStyle}>
          {items[0]}
        </div>
      ) : (
        <ul className='_neu-card-list' style={listStyle}>
          {items.map((item, i) => (
            <li
              key={i}
              className={`_neu-card-list-item${center ? ' _neu-card-list-item-center' : ''}`}
              style={itemStyle}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </NeumorphismListCardStyles>
  );
};

export default NeumorphismListCard;

const hueRotateAnimation = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;

const NeumorphismListCardStyles = styled.div<{ time?: number }>`
  flex: 1 1 46%;
  min-height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('fg', 0.1)};
  border-radius: 1rem;
  background: ${({ theme }) => theme.rgb('bg', 1, theme.isLightMode ? -1 : 1)};

  --color: ${({ theme }) => theme.asRgb('fg')};

  --shadow: ${({ theme }) => theme.asRgb('bg', theme.isLightMode ? -8 : 8)};

  &._color-auto:nth-child(1n),
  &._color-blue {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('blue', 0.5, 1)};
    background: ${({ theme }) => theme.rgb('blue', 0.1)};
    --color: ${({ theme }) => theme.asRgb('blue')};
    --shadow: var(--color);
  }

  &._color-auto:nth-child(2n),
  &._color-primary {
    box-shadow: 0 0 3px 1px inset
      ${({ theme }) =>
        theme.isLightMode ? theme.rgb('primary', 0.5) : theme.rgb('primary', 0.5, 8)};
    background: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('primary', 0.1) : theme.rgb('primary', 0.1, 5)};
    --color: ${({ theme }) =>
      theme.isLightMode ? theme.asRgb('primary', 4) : theme.asRgb('primary', 10)};
    --shadow: var(--color);
  }

  &._color-auto:nth-child(3n),
  &._color-magenta {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('magenta', 0.5)};
    background: ${({ theme }) => theme.rgb('magenta', 0.1)};
    --color: ${({ theme }) => theme.asRgb('magenta')};
    --shadow: var(--color);
  }

  &._color-auto:nth-child(4n),
  &._color-green {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('green', 0.5, -8)};
    background: ${({ theme }) => theme.rgb('green', 0.1, 10)};
    --color: ${({ theme }) => theme.asRgb('green', -6)};
    --shadow: var(--color);
  }
  &._color-yellow {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('yellow', 0.5, -8)};
    background: ${({ theme }) => theme.rgb('yellow', 0.1, 10)};
    --color: ${({ theme }) => theme.asRgb('yellow', -6)};
    --shadow: var(--color);
  }

  &._color-red {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('red', 0.5, -8)};
    background: ${({ theme }) => theme.rgb('red', 0.1, 10)};
    --color: ${({ theme }) => theme.asRgb('red', -6)};
    --shadow: var(--color);
  }

  &._color-secondary {
    box-shadow: 0 0 3px 1px inset ${({ theme }) => theme.rgb('secondary', 0.5)};
    background: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('secondary.700', 0.1) : theme.rgb('secondary', 0.1)};
    --color: ${({ theme }) => theme.asRgb(theme.isLightMode ? 'secondary.700' : 'secondary')};
    --shadow: ${({ theme }) => theme.asRgb(theme.isLightMode ? 'secondary.900' : 'secondary')};
  }

  &._color-rotate {
    animation: ${hueRotateAnimation} ${({ time }) => time ?? 30}s linear infinite;
  }

  ._neu-card-title {
    font-size: 2rem;
    font-weight: 900;
    color: rgba(var(--color), 1);
    text-align: center;
  }
  ._neu-card-subtitle {
    font-size: 1.25rem;
    font-weight: 700;
    color: rgba(var(--color), 0.8);
    text-align: center;
  }
  ._neu-card-icon {
    display: flex;
    font-size: 4rem;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: rgba(var(--color), 1);
    filter: drop-shadow(0 0 4px rgba(var(--color), 0.5));
  }

  ._neu-card-single-item {
    padding: 1rem;
    border-radius: 1rem;
    /* background: ${({ theme }) => theme.rgb('bg', 0.25)}; */
    /* box-shadow: 0 0 1px 1px inset rgba(var(--color), 0.25); */
    color: ${({ theme }) => theme.rgb('fg', 0.9)};
    margin-top: 1rem;
  }
  ._neu-card-list {
    list-style: none;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    margin: 0;
    margin-top: 1rem;
    padding: 0;
    flex: 1;
    height: 100%;
    justify-content: space-evenly;
    width: 100%;
    padding: 1rem;
    box-shadow: -0.125rem 0.125rem 0.75rem 0px inset rgba(var(--shadow), 0.35),
      0px 0px 0px 2px ${({ theme }) => theme.rgb('bg', 1)},
      -0.125rem 0.125rem 0.5rem 1px rgba(var(--shadow), 0.5);
    border-radius: 1rem;
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    ._neu-card-list-item {
      font-size: 1rem;
      font-weight: 400;
      padding: 0.5rem;
      border-radius: 0.5rem;
      width: fit-content;
      max-width: calc(100% - 3rem);
      background: ${({ theme }) => theme.rgb('bg', 0.75)};
      box-shadow: 0 0 3px 1px inset rgba(var(--shadow), 0.5);
      color: ${({ theme }) => theme.rgb('fg', 0.9)};
      &:nth-child(even) {
        margin-left: auto;
      }
      &:nth-child(odd) {
        margin-right: auto;
      }

      &._neu-card-list-item-center {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
