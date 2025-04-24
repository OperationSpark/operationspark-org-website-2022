import { motion, useDragControls } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import styled, { useTheme } from 'styled-components';

import { createPortal } from 'react-dom';

import { useMounted } from '@this/src/hooks/useMounted';
import { ColorKey } from '@this/src/theme/styled/styled';

export type UseModal = {
  title: string;
  setTitle: (title: string) => void;
  isOpen: boolean;
  isDraggable: boolean;
  blurBackground: boolean;
  clickAway: boolean;
  closeButton: boolean;
  style?: React.CSSProperties;
  open: () => void;
  close: () => void;
  cancel: (close: () => void) => void;
  toggle: () => void;
  set: (val: boolean) => void;
  autoClose: (fx: () => void) => () => void;
};
export type ModalOptions = {
  isDraggable?: boolean;
  blurBackground?: boolean;
  clickAway?: boolean;
  onCancel?: (close: () => void) => void;
  closeButton?: boolean;

  style?: React.CSSProperties;
  // closeOnEscape?: boolean;
};

export const useModal = (title = 'Modal Title', options?: ModalOptions): UseModal => {
  const [isOpen, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(title);
  const {
    isDraggable = false,
    blurBackground = false,
    clickAway = false,
    closeButton = true,
    style = {},
    onCancel,
  } = options ?? {};
  const cancel = onCancel ? () => onCancel(() => setOpen(false)) : () => setOpen(false);

  return {
    title: modalTitle,
    setTitle: setModalTitle,
    isOpen,
    isDraggable,
    clickAway,
    blurBackground,
    style,
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
    toggle: () => {
      setOpen(!isOpen);
    },
    cancel,
    set: setOpen,
    closeButton,
    autoClose: (fx) => () => {
      fx();
      setOpen(false);
    },
  };
};

type ModalProps = {
  menu: UseModal;
  children: ReactNode | ReactNode[];
  header?: ReactNode | ReactNode[];
  footer?: ReactNode | ReactNode[];
  frameBorderColor?: ColorKey;
  width?: string;
  height?: string;
};

export const Modal = ({
  children,
  menu,
  header,
  footer,
  frameBorderColor,
  width,
  height,
}: ModalProps) => {
  const isMounted = useMounted();
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const theme = useTheme();

  const [isDragging, setDragging] = useState(false);

  const toggle = (e?: MouseEvent) => {
    if (!menu.clickAway) {
      e?.stopPropagation();
      return;
    }

    menu.toggle();
  };

  useEffect(() => {
    if (!menu.isDraggable && menu.isOpen) {
      // Freeze scrolling on html/body when modal is mounted
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      // Unfreeze scrolling on html/body when modal is unmounted
      document.documentElement.style.overscrollBehavior = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [menu.isDraggable, menu.isOpen]);

  useEffect(() => {
    if (!menu.isOpen || !menu.clickAway) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        menu.set(false);
      }
    };
    if (menu.clickAway) {
      window.addEventListener('keydown', handleKeyDown, { passive: true });
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menu]);

  return !(isMounted && menu.isOpen)
    ? null
    : createPortal(
        <ModalStyles
          onClick={(e) => e.stopPropagation()}
          onMouseDown={toggle}
          ref={modalContainerRef}
          className={menu.blurBackground ? 'blur' : ''}
          style={{
            ...(frameBorderColor && {
              boxShadow: `0 0 0px 3px inset ${theme.rgb(frameBorderColor)}`,
            }),
          }}
        >
          <ModalContent
            id={menu.title}
            className='modal-drag-container'
            onMouseDown={(e) => e.stopPropagation()}
            drag={menu.isDraggable}
            dragConstraints={modalContainerRef}
            dragElastic={0.05}
            dragMomentum={false}
            dragControls={controls}
            whileDrag={
              menu.isDraggable
                ? { boxShadow: `0 0 1rem ${theme.rgb('black', 0.5)}`, scale: 1.025 }
                : {}
            }
            initial={{
              boxShadow: `0 0 0.1rem ${theme.rgb('black', 0.5)}`,
              scale: 0.5,
            }}
            animate={{
              boxShadow: `0 0 0.75rem ${theme.rgb('black', 0.5)}`,
              scale: 1,
              width: width || '500px',
              height: height || 'auto',
            }}
            exit={{ boxShadow: `0 0 0.1rem ${theme.rgb('black', 0.5)}`, scale: 0.5 }}
            transition={{ type: 'tween', duration: 0.1 }}
            dragListener={false}
          >
            <div
              className={'modal-titlebar' + (menu.isDraggable ? ' drag' : '')}
              onPointerDown={(e) => {
                setDragging(true);
                controls.start(e);
              }}
              onPointerUp={() => setDragging(false)}
              style={{ cursor: menu.isDraggable ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <div className='modal-title'>{menu.title}</div>
              {menu.closeButton && (
                <div className='close-btn-wrapper'>
                  <button onClick={() => menu.cancel(menu.close)} className='close-button'>
                    <div className='flex flex-center'>
                      <CloseIcon size={24} />
                    </div>
                  </button>
                </div>
              )}
            </div>
            <div className='modal-content'>
              {header && <div className='modal-header'>{header}</div>}
              <div className='modal-body' style={menu.style}>
                {children}
              </div>
              {footer && <div className='modal-footer'>{footer}</div>}
            </div>
          </ModalContent>
        </ModalStyles>,
        document.getElementById('modal-root') as HTMLElement,
      );
};

const ModalStyles = styled.main`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &.blur {
    background: ${({ theme }) => theme.rgb('bg', 0.5)};
    backdrop-filter: blur(3px);
  }

  .modal-drag-container {
    position: relative;
    pointer-events: initial;
    min-width: 350px;
    min-height: fit-content;
    max-width: 90vw;
    max-height: 96vh;
    width: 500px;
    display: flex;
    background: ${({ theme }) => theme.rgb('bg', 1, 1)};
    border-radius: 0.5rem;
  }

  .modal-titlebar {
    display: flex;
    user-select: none;
    border-radius: 0.5rem 0.5rem 0 0;
    height: 2.25rem;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    padding: 0.25rem;
    justify-content: space-between;
    flex-flow: row nowrap;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1em;
    align-items: center;
    background: ${({ theme }) => `
    linear-gradient(180deg,
      ${theme.rgb('bg', 1, 1)} 0%,
      ${theme.rgb('bg', 1, -2)} 20%,
      ${theme.rgb('bg', 1, 1)} 80%,
      ${theme.rgb('bg', 1, 1)} 96%,
      ${theme.rgb('bg', 1, 4)} 100%
    )
    `};

    &.drag {
      background: ${({ theme }) => `
      linear-gradient(0deg,
        ${theme.rgb('bg', 1, -1)} 0%,
        ${theme.rgb('bg', 1, 1)} 50%,
        ${theme.rgb('bg', 1, -1)} 100%
      )
    `};
    }

    .close-btn-wrapper {
      padding-top: 0.25rem;
    }
    .close-button {
      padding: 0 0.25rem;
      border-radius: 0.25rem;
      background: ${({ theme }) => theme.rgb('bg', 1, 1)};
      color: ${({ theme }) => theme.rgb('fg', 0.5, -2)};

      box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('fg', 0.25, -2)};
      transition: all 125ms;
      &:hover {
        background: ${({ theme }) => theme.rgb('red', 0.25, 2)};
        color: ${({ theme }) => theme.rgb('red', 1, 2)};
        box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('red', 1, -2)};
      }

      &:active {
        background: ${({ theme }) => theme.rgb('red', 0.125, 2)};
        color: ${({ theme }) => theme.rgb('red', 0.6, 2)};
        box-shadow: 0 0 1px 1px inset ${({ theme }) => theme.rgb('red', 0.5, -2)};
      }
    }
    .modal-title {
      position: relative;
      display: flex;
      max-width: calc(100% - 2rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .modal-content {
    margin-top: 2.25rem;
    max-height: calc(100% - 2.25rem);
    width: 100%;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-flow: column;

    border-radius: 0 0 0.5rem 0.5rem;
    .modal-header,
    .modal-body,
    .modal-footer {
      padding: 0.5rem;
    }
    .modal-header,
    .modal-body,
    .modal-footer {
      display: flex;
      gap: 1rem;
    }
    // TODO: Finish styling
    .modal-header {
      flex-flow: row;
      justify-content: space-between;
    }
    .modal-body {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
      height: 100%;
      max-height: calc(95vh - 50px);
      overflow: auto;
    }
    .modal-footer {
      justify-content: center;
      button {
        flex: 0.5;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .modal-drag-container {
      min-width: calc(100vw - 1.5rem);
      max-width: calc(100vw - 1.5rem);
      max-height: calc(100vh - 1.5rem);
      height: fit-content;
      margin: auto auto;
      position: fixed;
      inset: 0.75rem;
      border-radius: 0.25rem;
    }
  }
`;

const ModalContent = styled(motion.div)`
  ::-webkit-scrollbar,
  * ::-webkit-scrollbar {
    width: 0.4rem;
  }
  border: 1px solid ${({ theme }) => theme.rgb('fg', 0.25, -2)};
`;
