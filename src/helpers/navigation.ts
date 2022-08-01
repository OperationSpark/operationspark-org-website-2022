export const checkActiveSubLink = (href1: string, href2: string): boolean => {
  return href1 === href2 ? true : href1.split('/').pop() === href2.split('/').pop();
};
