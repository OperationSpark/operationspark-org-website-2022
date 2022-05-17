import { ITitleDescription } from './bits';
import { IconBtnCardProps } from '../../src/components/Cards/IconBtnCard';
import { YellowCardProps } from '../../src/components/Cards/LinkCard';

export interface IProgramsForAll extends ITitleDescription {
  programs: IconBtnCardProps[];
}

export interface ITeamEffort extends ITitleDescription {
  cards: YellowCardProps[];
}

export interface IHome {
  igniteCareer: ITitleDescription;
  greatCompanies: ITitleDescription;
  programsForAll: IProgramsForAll;
  teamEffort: ITeamEffort;
}
