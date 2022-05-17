import dynamic from 'next/dynamic';

export const MainContainer = dynamic(() => import('./MainContainer'));
export * from './Main';
export * from './Section';
export * from './Content';
