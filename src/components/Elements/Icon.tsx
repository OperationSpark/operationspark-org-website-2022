import Image from 'next/image';

import rgbDataURL from '@this/src/helpers/rgbDataURL';

const iconUrls = {
  briefcase: '/images/icons/briefcase.svg',
  bank: '/images/icons/piggy-bank.svg',
  globe: '/images/icons/globe.svg',
  student: '/images/icons/student.svg',
  laptop: '/images/icons/laptop.svg',
};

export type IconUrl = keyof typeof iconUrls;

interface IconProps {
  icon: IconUrl;
  size?: number;
}

const Icon = ({ icon, size = 75 }: IconProps) => {
  return (
    <Image
      src={iconUrls[icon]}
      alt={`${icon} icon`}
      title={`${icon} icon`}
      width={size}
      height={size}
      placeholder='blur'
      blurDataURL={rgbDataURL(146, 12, 248)}
    />
  );
};

export default Icon;
