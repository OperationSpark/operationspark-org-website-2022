import { AnimatePresence, HTMLMotionProps, MotionProps, motion } from 'framer-motion';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import styled, { DefaultTheme, useTheme } from 'styled-components';

import { ILogo } from '@this/data/types/logos';
import { Img } from '@this/src/Typography/elements/Html';

const carouselGradient =
  (bgColor: string) =>
  ({ theme: { alpha } }: { theme: DefaultTheme }) =>
    `linear-gradient(
      180deg,
      ${alpha.bg} -25%,
      ${bgColor} 4%,
      ${bgColor} 96%,
      ${alpha.bg} 125%
    )`;

const CarouselContainerStyles = styled(motion.div)`
  position: relative;
  overflow: hidden;
  padding: 0.25rem 1rem;
  background: ${({ theme }) => theme.bg};
  background: ${({ theme }) => carouselGradient(theme.bg)({ theme })};
`;
const CarouselStyles = styled(motion.div)`
  .carousel {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 1rem;
  }
`;
const CarouselItemStyles = styled(motion.div)`
  border-radius: 0.5rem;
  user-select: none;
  display: flex;
  align-items: center;

  a {
    display: flex;
    border-radius: 0.25rem;
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }
  * {
    -webkit-user-drag: none;
  }
`;

interface CarouselItemProps extends ILogo {
  theme: DefaultTheme;
  size: number;
  paddingLR: number;
}
const CarouselItem = ({
  name,
  url,
  logoLight,
  logoDark,
  theme,
  size,
  paddingLR,
}: CarouselItemProps) => {
  return (
    <AnimatePresence>
      <CarouselItemStyles style={{ padding: `10px ${paddingLR}px` }}>
        <a
          href={url}
          onClick={(e) => e.preventDefault()}
          onDoubleClick={() => {
            window.open(url, '_blank');
          }}
          tabIndex={-1}
        >
          <Img
            width={size}
            alt={name}
            title={name}
            src={theme.colorMode === 'light' ? logoLight : logoDark}
          />
        </a>
      </CarouselItemStyles>
    </AnimatePresence>
  );
};

const CarouselButtonStyles = styled(motion.button)`
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  backdrop-filter: blur(8px);
`;

interface CarouselButtonProps extends HTMLMotionProps<'button'> {
  direction: 'left' | 'right';
  size?: number;
}

const CarouselButton = ({ size = 20, direction, ...props }: CarouselButtonProps) => {
  const theme = useTheme();
  const isLeft = direction === 'left';
  const ArrowIcon = isLeft ? IoMdArrowRoundBack : IoMdArrowRoundForward;
  const paddingDirection = isLeft ? 'paddingLeft' : 'paddingRight';
  return (
    <CarouselButtonStyles
      className={`carousel-button-${direction}`}
      aria-label={`Carousel scroll ${direction}`}
      style={{
        padding: '4px',
        [direction]: 0,
        background: carouselGradient('rgba(100, 100, 100, 0.1)')({ theme }),
        boxShadow: `0 0 0px ${theme.alpha.fg}`,
      }}
      whileHover={{
        [paddingDirection]: '6px',
        background: carouselGradient('rgba(125, 125, 125, 0.25)')({ theme }),
        boxShadow: `0 0 3px ${theme.alpha.fg}`,
      }}
      whileTap={{
        [paddingDirection]: '4px',
        background: carouselGradient('rgba(75, 75, 75, 0.25)')({ theme }),
        boxShadow: `0 0 1px ${theme.alpha.fg}`,
      }}
      transition={{
        type: 'tween',
        duration: 0.15,
      }}
      {...props}
    >
      <ArrowIcon
        size={size}
        color={theme.isLightMode ? theme.primary[700] : theme.secondary[400]}
      />
    </CarouselButtonStyles>
  );
};

const Carousel = ({ logos, style }: { logos: ILogo[]; style?: CSSProperties }) => {
  const xWidth = 60;
  const xPadding = 20;
  const theme = useTheme();

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(
    logos.map((item) => ({
      ...item,
      fullSize: item.width * xWidth + xPadding * 2,
    })),
  );
  const [userDrag, setUserDrag] = useState(false);
  const [idleStart, setIdleStart] = useState<number>(0);

  const shiftRight = () => {
    const [first, ...rest] = items;

    setItems([...rest, first]);
  };

  const shiftLeft = () => {
    const len = items.length - 1;
    setItems([items[len], ...items.slice(0, len)]);
  };

  const handleDrag: MotionProps['onDragEnd'] = (e, { velocity }) => {
    setUserDrag(true);
    setIdleStart(Date.now());
    if (velocity.x < -25) {
      shiftRight();
    }
    if (velocity.x > 25) {
      shiftLeft();
    }
  };

  const handleShift =
    (direction: 'left' | 'right' = 'left') =>
    () => {
      setUserDrag(true);
      setIdleStart(Date.now());
      if (direction === 'left') {
        shiftLeft();
      }
      if (direction === 'right') {
        shiftRight();
      }
    };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!userDrag) {
      interval = setInterval(() => shiftRight(), 4000);
    } else {
      setTimeout(() => Date.now() - idleStart > 10000 && setUserDrag(false), 10000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  });

  return (
    <CarouselContainerStyles style={style} ref={carouselContainerRef}>
      <CarouselButton direction='left' onClick={handleShift('left')} />
      <CarouselStyles
        drag='x'
        ref={carouselRef}
        dragConstraints={carouselContainerRef}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDrag}
      >
        <motion.div style={{ x: -items[0].fullSize }} className='carousel'>
          {items.map((logo) => (
            <CarouselItem
              {...logo}
              key={logo.name}
              size={logo.width * xWidth}
              paddingLR={xPadding}
              theme={theme}
            />
          ))}
        </motion.div>
      </CarouselStyles>
      <CarouselButton direction='right' onClick={handleShift('right')} />
    </CarouselContainerStyles>
  );
};

export default Carousel;
