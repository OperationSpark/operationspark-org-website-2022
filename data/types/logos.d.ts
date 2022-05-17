export interface ILogo {
  name: string;
  url: string;
  logoLight: string;
  logoDark: string;
  width: number;
}

export interface ISupporterFunderLogos {
  funders: ISupporterLogo[];
  partners: ISupporterLogo[];
}
