import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

type TNodeItem = {
  id: string;
  top: number;
  name: string;
  height: number;
  width: number;
};

interface ProgressBarProps {
  isTop: boolean;
  progressOnly?: boolean;
}

const ProgressBar = ({ isTop, progressOnly = false }: ProgressBarProps) => {
  const [percent, setPercent] = useState(0);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<TNodeItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const handleClick = ({ top }: TNodeItem) => {
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  // Handle updating progress position on scroll
  useEffect(() => {
    const handleScroll = () => {
      const { height, top } = document.body.getBoundingClientRect();
      const base = height - window.innerHeight;
      if (nodes.length) {
        const current = nodes
          .filter((val) => {
            const t = Math.abs(top);
            if (t + 15 >= val.top && t - 15 <= val.top + val.height) {
              return true;
            }
          })
          .pop();

        if (current) {
          setCurrentNode(current.name);
        } else if (Math.abs(top) < nodes[0].top) {
          setCurrentNode(null);
        }
      } else {
        setPercent(Number(((Math.abs(top) / base) * 100).toFixed(2)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nodes]);

  // Reset dom node positions upon window resize
  useEffect(() => {
    const setDomNodes = () => {
      const { domNodePos } = getDomNodePos(theme.navHeight);
      setNodes(domNodePos);
    };
    window.addEventListener('resize', setDomNodes);
    return () => {
      window.removeEventListener('resize', setDomNodes);
    };
  });

  // Set initial dom nodes upon page load
  // Scroll to node position if hash exists
  useEffect(() => {
    const timeout = setTimeout(() => {
      // allow time for dom to render
      const { domNodePos, top } = getDomNodePos(theme.navHeight);
      if (!!top) {
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
      setNodes(domNodePos);
      setIsLoaded(true);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [router.pathname, theme.navHeight]);

  return (
    <ProgressBarStyles>
      {progressOnly || !nodes.length ? (
        isLoaded && <div className='progress-bar' style={{ width: `${percent}%` }}></div>
      ) : (
        <Fragment>
          <div className='progress-padding' style={{ width: `${100 - percent}%` }}></div>
          <div className='progress-positions'>
            {nodes.map((node) => (
              <AnimatePresence key={node.id}>
                {!isTop && (
                  <motion.button
                    className={`node-item ${node.name === currentNode ? 'active' : ''}`}
                    onClick={() => handleClick(node)}
                    initial={{ scale: 0, y: -25, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      y: -25,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ type: 'tween' }}
                  >
                    {node.name}
                  </motion.button>
                )}
              </AnimatePresence>
            ))}
          </div>
        </Fragment>
      )}
    </ProgressBarStyles>
  );
};

const getDomNodePos = (navHeight: number) => {
  const currentHash = window.location.hash.slice(1);
  let top = 0;
  const domNodePos = Array.from(document.querySelectorAll('._progress')).map((node) => {
    const name = node.id
      .split('-')
      .map((str) => str[0].toUpperCase() + str.slice(1))
      .join(' ');
    const { top: nodeTop, height: nodeHeight } = node.getBoundingClientRect();
    const { top: clientTop, height: clientHeight } = document.body.getBoundingClientRect();

    const fromTop = nodeTop - clientTop;
    const w = (nodeHeight / (clientHeight - window.innerHeight + clientTop)) * 100;

    if (currentHash === `s.${node.id}`) {
      top = fromTop - navHeight - 8;
    }
    return {
      id: node.id,
      name,
      top: fromTop - navHeight - 8,
      height: nodeHeight,
      width: w,
    };
  });
  return {
    domNodePos,
    top,
  };
};

export default ProgressBar;

const ProgressBarStyles = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 1rem;

  position: relative;
  pointer-events: none;
  .progress-bar {
    height: 0.5rem;
    margin-top: 0.5rem;
    background: ${({ theme: { isLightMode, primary } }) => `linear-gradient(
      0deg,
      ${primary[isLightMode ? 300 : 700]} 0%,
      ${primary[isLightMode ? 100 : 300]} 25%,
      ${primary[isLightMode ? 100 : 300]} 75%,
      ${primary[isLightMode ? 300 : 700]} 100%
    )`};
  }
  .progress-positions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 0.25rem;
    line-height: 1rem;
    font-size: 0.75rem;
    color: ${({ theme: { fg } }) => fg};

    .node-item {
      max-width: 200px;
      user-select: none;
      white-space: pre;
      font-weight: 600;
      pointer-events: auto;
      flex: 1;
      padding: 0 0.5rem;
      border-radius: 0.25rem;
      background: linear-gradient(
        0deg,
        rgba(125, 125, 125, 0) 0%,
        rgba(125, 125, 125, 0) 25%,
        rgba(125, 125, 125, 0) 75%,
        rgba(125, 125, 125, 0) 100%
      );
      :hover {
        background: linear-gradient(
          0deg,
          rgba(125, 125, 125, 0.3) 0%,
          rgba(125, 125, 125, 0.1) 25%,
          rgba(125, 125, 125, 0.1) 75%,
          rgba(125, 125, 125, 0.3) 100%
        );
      }
    }
    .node-item.active {
      background: ${({ theme: { isLightMode, primary } }) =>
        `linear-gradient(0deg,
          ${primary[isLightMode ? 300 : 300]} 0%,
          ${primary[isLightMode ? 100 : 800]} 25%,
          ${primary[isLightMode ? 100 : 800]} 75%,
          ${primary[isLightMode ? 300 : 300]} 100%
      )`};
    }
  }
`;
