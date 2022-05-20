/** Extracts only numbers from string */
export const getNumsOnly = (value: string) =>
  value.match(/\d+/g)?.join('') || '';

/**
 * 1. Extracts only numbers from string
 * 2. Slices off starting '1' (if exists)
 * 3. returns string with limit of 10 characters
 * @example getNums('ABC303-123-4567DEF') => '3031234567'
 */
export const getNums = (value: string) => {
  const numsOnly = getNumsOnly(value);
  const startsWith1 = numsOnly[0] === '1';
  const nums = startsWith1 ? numsOnly.slice(1, 11) : numsOnly.slice(0, 10);
  return nums;
};

/**
 * Parse numbers and adds dashes to phone number
 * @example parsPhoneNumber('3031234567') => '303-123-4567'
 */
export const parsePhoneNumber = (value: string): string => {
  const nums = getNums(value);

  const hasDash = (i: number) => {
    const noDash = !((i + 1) % 3 === 0) || i > 6;
    return !noDash;
  };
  const parsedNumber =
    nums
      .split('')
      .map((num, i) => (hasDash(i) ? `${num}-` : num))
      .join('') || '';

  return parsedNumber;
};

/** Capitalize first letter of string */
export const capFirstLetter = (value?: string): string => {
  if (!value) {
    return '';
  }
  return value[0].toLocaleUpperCase() + value.slice(1);
};

/**
 * Parse numbers and adds slashes to date
 * @example parseDate('01251989') => '01/25/1989'
 */
export const parseDate = (value: string): string => {
  const nums = getNumsOnly(value).slice(0, 8);
  const hasSlash = (i: number) => {
    const slash = !((i + 1) % 2 === 0) || i > 4 || i === nums.length - 1;
    return slash;
  };

  const parsedDate =
    nums
      .split('')
      .map((num, i) => (hasSlash(i) ? num : `${num}/`))
      .join('') || '';

  return parsedDate;
};
