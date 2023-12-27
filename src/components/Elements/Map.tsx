import { Img } from '@this/src/Typography/elements/Html';
import styled from 'styled-components';

const MapStyles = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  .img {
    * {
      -webkit-user-drag: none;
      user-select: none;
    }

    position: relative;
    width: 500px;
    height: 100%;
    overflow: hidden;

    aspect-ratio: 1 / 1;
    border-radius: 0.5rem;
    transition: box-shadow 125ms;
    box-shadow: 0 0.1rem 0.2rem ${({ theme }) => theme.primary[theme.isLightMode ? 800 : 200]};
    :hover {
      box-shadow: 0 0.1rem 0.5rem ${({ theme }) => theme.primary[theme.isLightMode ? 800 : 200]};
    }
    :active {
      transition: box-shadow 75ms;
      box-shadow: 0 0.1rem 0.1rem ${({ theme }) => theme.primary[theme.isLightMode ? 800 : 200]};
    }
  }
`;

interface MapProps {
  href: string;
  address: string;
}

const Map = ({ href, address }: MapProps) => {
  return (
    <MapStyles>
      <div className='img'>
        <a href={href} target='_blank' rel='noreferrer' title={`${address}\n\nOpen in google maps`}>
          <Img
            src='/images/opspark-map.png'
            width='100%'
            height='100%'
            alt='Operation Spark map'
            loading='eager'
          />
        </a>
      </div>
    </MapStyles>
  );
};

export default Map;
