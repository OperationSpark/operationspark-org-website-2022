import React, { Fragment, ReactNode, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type MouseCoords = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CursorTooltipProps = {
  children: ReactNode | string;
  title?: string | ReactNode;
};

export const CursorTooltip = ({ children, title }: CursorTooltipProps) => {
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0, width: 0, height: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isActive, setActive] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) {
      document.body.click();
      const rect = tooltipRef.current?.getBoundingClientRect() ?? mouseCoords;
      const { width, height, y } = rect;
      clearTimeout(timeoutRef.current);
      const coords = {
        x: e.clientX,
        y,
        width,
        height,
      };
      setMouseCoords(coords);

      timeoutRef.current = setTimeout(() => setActive(true), 250);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setActive(false);
    timeoutRef.current = setTimeout(() => setActive(false), 250);
  };

  useEffect(() => {
    const setInactive = (e: MouseEvent | TouchEvent) => {
      // Remove tooltip if mouse is outside of tooltip and target is not tooltip
      if (e.target instanceof HTMLElement && !tooltipRef.current?.contains?.(e.target)) {
        return setActive(false);
      }
      if (e instanceof MouseEvent && tooltipRef.current) {
        // Update tooltip position
        const rect = tooltipRef.current?.getBoundingClientRect();
        const { width, height, y } = rect;
        const x = e.clientX;
        clearTimeout(timeoutRef.current);
        const coords = { x, y, width, height };
        setMouseCoords(coords);
      }
    };

    if (isActive) {
      window.addEventListener('mousemove', setInactive, { passive: true });
      window.addEventListener('touchmove', setInactive, { passive: true });

      window.addEventListener('pointermove', setInactive, {
        passive: true,
      });
    }
    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', setInactive);
      window.removeEventListener('touchmove', setInactive);
      window.removeEventListener('pointermove', setInactive);
    };
  }, [isActive]);

  return (
    <Fragment>
      {!isActive ? null : title && <CursorTooltipPortal text={title} mouseCoords={mouseCoords} />}
      <div
        style={{ all: 'unset' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={tooltipRef}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default CursorTooltip;

type CursorTooltipPortalProps = {
  text: string | ReactNode;
  mouseCoords: MouseCoords;
};
const CursorTooltipPortal = ({ text, mouseCoords }: CursorTooltipPortalProps) => {
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>(mouseCoords);
  useLayoutEffect(() => {
    const { x, y, height } = mouseCoords;

    const rect = tooltipRef.current?.getBoundingClientRect();

    if (rect) {
      const { innerHeight, innerWidth } = window;
      let newX = x;
      let newY = y;

      const alignTop = () => (newY = height - (rect.height + height) + y - 8);
      const justifyCenter = () => (newX = x - rect.width / 2);

      // Align Center / Justify left / Trails Right
      // TODO: Align Bottom

      justifyCenter();
      alignTop();

      // Prevent tooltip from going off screen
      if (newX + rect.width > innerWidth - 16) {
        newX = innerWidth - rect.width - 16;
      }
      if (newX < 16) {
        newX = 16;
      }

      if (newY + rect.height > innerHeight - 16) {
        newY = innerHeight - rect.height - 16;
      }
      if (newY < 16) {
        newY = height;
      }

      return setCoords({ x: newX, y: newY });
    }

    return setCoords({ x, y });
  }, [mouseCoords, tooltipRef.current?.clientWidth]);

  return createPortal(
    <CursorTooltipPortalStyles
      ref={tooltipRef}
      style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {text}
    </CursorTooltipPortalStyles>,
    document.getElementById('tooltip-root')!,
  );
};

const CursorTooltipPortalStyles = styled(motion.span)`
  position: fixed;
  box-sizing: border-box;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 0 0.25rem ${({ theme }) => theme.magenta[300]};
  max-width: 200px;
  min-width: fit-content;
  height: fit-content;
  background: ${({ theme }) => theme.bg};
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  text-align: center;
`;
