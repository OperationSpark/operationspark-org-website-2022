import Image from 'next/image';
import styled from 'styled-components';
import rgbDataURL from '@this/src/helpers/rgbDataURL';

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
          <Image
            src='/images/opspark-map.png'
            layout='responsive'
            width='500px'
            height='500px'
            objectFit='contain'
            alt='Operation Spark map'
            quality={100}
            blurDataURL={rgbDataURL(134, 0, 241)}
            loading='eager'
            priority
          />
        </a>
      </div>
    </MapStyles>
  );
};

export default Map;
