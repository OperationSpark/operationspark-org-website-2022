export const checkActiveSubLink = (href1: string, href2: string): boolean => {
  if (href1 === href2) {
    return true;
  }
  const hrefArr1 = href1.split('/');
  const hrefArr2 = href2.split('/');

  const lastPath1 = hrefArr1.pop();
  const lastPath2 = hrefArr2.pop();

  return !!lastPath1 && lastPath1 === lastPath2;
};
