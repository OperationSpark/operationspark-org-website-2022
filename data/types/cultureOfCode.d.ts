import { ITitleAndDescription } from './bits';

export interface EffectiveLearning {
  title: string[];
  description: string[];
  tips: ITitleAndDescription[];
}
export interface OpSparkValues {
  title: string[];
  description: string[];
  image?: string;
  rules?: {
    title: string;
    list: {
      rule: string;
      subRules: string[];
    }[];
  };
}

export interface OurDeal {
  title: string;
  sections: ITitleAndDescription[];
  opSparkCommunity: string;
  principleIssues: ITitleAndDescription;
}

export interface ICultureOfCode {
  header: ITitleAndDescription;
  ourDeal: OurDeal;
  opSparkValues1: OpSparkValues[];
  opSparkValues2: OpSparkValues[];
  effectiveLearning: EffectiveLearning;
}
