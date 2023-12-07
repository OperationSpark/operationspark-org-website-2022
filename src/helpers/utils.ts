import { camelCase, startCase } from 'lodash';

export const formatName = (name: string) => {
  if (!name || name.length < 2) return name || '';
  return startCase(camelCase(name));
};
