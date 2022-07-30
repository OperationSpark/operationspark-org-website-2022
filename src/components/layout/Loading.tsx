import { motion } from 'framer-motion';
import Image from 'next/image';

import styled from 'styled-components';

const Loading = () => {
  return (
    <main>
      <LoadingStyles>
        <div className='loading-container'>
          <div>
            <Image
              src='/images/os/mc-hallebots.webp'
              alt='Halle Loading'
              width={400}
              height={225}
              priority
            />
          </div>
          <div>
            <Image
              src='/images/os/opspark-banner.webp'
              alt='Halle Loading'
              width={400}
              height={175}
              priority
            />
          </div>
          <div className='loading-bar-container'>
            <motion.div
              className='loading-bar'
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ type: 'tween', duration: 1 }}
            />
          </div>
        </div>
      </LoadingStyles>
    </main>
  );
};

export default Loading;

const LoadingStyles = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  * {
    user-select: none;
    -webkit-user-drag: none;
  }

  .loading-container {
    padding: 1rem;
  }
  .loading-bar-container {
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg};
    border-radius: 0.25rem;
  }
  .loading-bar {
    border-radius: 0.25rem;
    height: 1rem;
    background: linear-gradient(
      0deg,
      rgba(80, 255, 120, 1) 0%,
      rgba(80, 255, 120, 1) 15%,
      rgba(190, 255, 210, 1) 50%,
      rgba(80, 255, 120, 1) 85%,
      rgba(80, 255, 120, 1) 100%
    );
  }
`;
