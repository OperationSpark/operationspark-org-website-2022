import styled, { useTheme } from 'styled-components';
import Image from 'next/image';

import { useClickAway } from '@this/src/hooks/useClickAway';

type ThemeModes = 'light' | 'dark' | 'system';

const ThemeButton = () => {
  const { colorMode, isSystemMode, setColorMode } = useTheme();
  const [menuRef, isOpen, setOpen] = useClickAway();

  const themeModes: ThemeModes[] = ['light', 'dark', 'system'];

  const getThemeImgSrc = (mode: ThemeModes) => {
    const imgName = mode === 'system' ? 'system' : mode === 'dark' ? 'moon' : 'sun';
    return `/images/icons/${imgName}.svg`;
  };

  const checkIsThemeMode = (mode: ThemeModes) => {
    if (mode === 'system' && isSystemMode) {
      return true;
    }
    return mode === colorMode && !isSystemMode;
  };

  return (
    <ThemeButtonStyles ref={menuRef} onClick={() => setOpen(!isOpen)}>
      <button id='theme-nav-button'>
        <span className='theme-image'>
          <span className='icon'>
            <Image
              src={getThemeImgSrc(isSystemMode ? 'system' : colorMode)}
              width={50}
              height={50}
              alt={colorMode}
            />
          </span>
        </span>
        <span className='theme-text primary-secondary'>Theme</span>
      </button>
      {isOpen && (
        <ThemeDropdown>
          {themeModes.map((mode) => (
            <ThemeDropdownButton
              key={mode}
              onClick={() => setColorMode(mode)}
              imageSrc={getThemeImgSrc(mode)}
              title={`${mode} theme`}
              selected={checkIsThemeMode(mode)}
            >
              {mode === 'system' ? 'OS Default' : mode[0].toUpperCase() + mode.slice(1)}
            </ThemeDropdownButton>
          ))}
        </ThemeDropdown>
      )}
    </ThemeButtonStyles>
  );
};

export default ThemeButton;

const ThemeDropdownButton = ({
  onClick,
  imageSrc,
  title,
  children,
  selected,
}: {
  onClick: () => void;
  imageSrc: string;
  title: string;
  children: string;
  selected: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`theme-dropdown-button${selected ? ' selected' : ''}`}
    >
      <span className='theme-image'>
        <Image src={imageSrc} width={24} height={24} alt={title} />
      </span>
      <span className='theme-name'>{children}</span>
    </button>
  );
};

const ThemeButtonStyles = styled.menu`
  all: unset;
  position: relative;
  #theme-nav-button {
    height: 3rem;
    color: ${({ theme }) => theme.primary[0]};
    position: relative;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    :hover,
    :focus {
      .theme-image {
        transform: translateY(-4px);
      }
    }
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[700]};
    }
    .theme-image {
      position: absolute;
      width: 100%;
      z-index: -1;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      transition: 250ms;
      transform: translateY(0px);
      filter: drop-shadow(0 0 1px ${({ theme }) => (theme.isLightMode ? theme.fg : theme.black)});
      .icon {
        display: inline-flex;
        margin: 0 0.25rem;

        vertical-align: middle;
      }
    }
    .theme-text {
      font-size: 0.8rem;
      font-weight: 900;
      width: 100%;
      padding: 0.1rem 0.25rem;
      line-height: 1em;
      display: flex;
      border-radius: 0.5rem;
      background: ${({ theme }) => theme.alpha.bg50};
    }
  }
`;
const ThemeDropdown = styled.div`
  all: unset;
  position: absolute;
  z-index: 1000;
  right: 0;
  top: calc(100% + 0.25rem);
  width: 125px;
  /* background: ${({ theme }) => theme.alpha.fg}; */
  display: flex;
  flex-flow: column;
  grid-gap: 0.1rem;
  border-radius: 0.75rem 0.25rem 0.75rem 0.25rem;
  filter: drop-shadow(0 2px 2px ${({ theme }) => theme.alpha.fg50});
  button {
    color: ${({ theme }) => theme.fg};
    background: ${({ theme }) => theme.bg};
    border-radius: 0.25rem;
    width: 100%;
    padding: 0.5rem;
    text-align: left;
    display: flex;
    align-items: center;
    grid-gap: 0.5rem;

    .theme-image {
      display: flex;
    }
    :first-child {
      border-top-left-radius: 0.75rem;
    }
    :last-child {
      border-bottom-right-radius: 0.75rem;
    }
    :hover {
      background: ${({ theme }) => theme.bgHover};
    }
    :focus-visible:not(.selected) {
      outline: none;
      box-shadow: 0 0 2px 2px ${({ theme }) => theme.secondary[700]} inset;
    }
  }
  button.selected {
    background: ${({ theme }) => theme.bgHover};
    box-shadow: 0 0 3px 1px ${({ theme }) => theme.magenta[500]} inset;
    outline: none;
    :focus-visible {
      box-shadow: 0 0 4px 2px ${({ theme }) => theme.magenta[500]} inset;
    }
  }
`;
