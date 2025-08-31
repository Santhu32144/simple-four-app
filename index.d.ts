declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

interface Currency {
  name: string;
  valueInUSD: number;
  symbol: string;
  fullName: string;
  flag?: string;
};