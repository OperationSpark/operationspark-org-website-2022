/** Extracts only numbers from string */
export const getNumsOnly = (value: string) => value.match(/\d+/g)?.join('') || '';

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

export const getStateFromZipCode = (zip: number) => {
  const stateZipCodes = [
    { min: 35000, max: 36999, code: 'AL', long: 'Alabama' },
    { min: 99500, max: 99999, code: 'AK', long: 'Alaska' },
    { min: 85000, max: 86999, code: 'AZ', long: 'Arizona' },
    { min: 71600, max: 72999, code: 'AR', long: 'Arkansas' },
    { min: 90000, max: 96699, code: 'CA', long: 'California' },
    { min: 80000, max: 81999, code: 'CO', long: 'Colorado' },
    { min: 6000, max: 6999, code: 'CT', long: 'Connecticut' },
    { min: 19700, max: 19999, code: 'DE', long: 'Deleware' },
    { min: 32000, max: 34999, code: 'FL', long: 'Florida' },
    { min: 30000, max: 31999, code: 'GA', long: 'Georgia' },
    { min: 96700, max: 96999, code: 'HI', long: 'Hawaii' },
    { min: 83200, max: 83999, code: 'ID', long: 'Idaho' },
    { min: 60000, max: 62999, code: 'IL', long: 'Illinois' },
    { min: 46000, max: 47999, code: 'IN', long: 'Indiana' },
    { min: 50000, max: 52999, code: 'IA', long: 'Iowa' },
    { min: 66000, max: 67999, code: 'KS', long: 'Kansas' },
    { min: 40000, max: 42999, code: 'KY', long: 'Kentucky' },
    { min: 70000, max: 71599, code: 'LA', long: 'Louisiana' },
    { min: 3900, max: 4999, code: 'ME', long: 'Maine' },
    { min: 20600, max: 21999, code: 'MD', long: 'Maryland' },
    { min: 1000, max: 2799, code: 'MA', long: 'Massachusetts' },
    { min: 48000, max: 49999, code: 'MI', long: 'Michigan' },
    { min: 55000, max: 56999, code: 'MN', long: 'Minnesota' },
    { min: 38600, max: 39999, code: 'MS', long: 'Mississippi' },
    { min: 63000, max: 65999, code: 'MO', long: 'Missouri' },
    { min: 59000, max: 59999, code: 'MT', long: 'Montana' },
    { min: 27000, max: 28999, code: 'NC', long: 'North Carolina' },
    { min: 58000, max: 58999, code: 'ND', long: 'North Dakota' },
    { min: 68000, max: 69999, code: 'NE', long: 'Nebraska' },
    { min: 88900, max: 89999, code: 'NV', long: 'Nevada' },
    { min: 3000, max: 3899, code: 'NH', long: 'New Hampshire' },
    { min: 7000, max: 8999, code: 'NJ', long: 'New Jersey' },
    { min: 87000, max: 88499, code: 'NM', long: 'New Mexico' },
    { min: 10000, max: 14999, code: 'NY', long: 'New York' },
    { min: 43000, max: 45999, code: 'OH', long: 'Ohio' },
    { min: 73000, max: 74999, code: 'OK', long: 'Oklahoma' },
    { min: 97000, max: 97999, code: 'OR', long: 'Oregon' },
    { min: 15000, max: 19699, code: 'PA', long: 'Pennsylvania' },
    { min: 300, max: 999, code: 'PR', long: 'Puerto Rico' },
    { min: 2800, max: 2999, code: 'RI', long: 'Rhode Island' },
    { min: 29000, max: 29999, code: 'SC', long: 'South Carolina' },
    { min: 57000, max: 57999, code: 'SD', long: 'South Dakota' },
    { min: 37000, max: 38599, code: 'TN', long: 'Tennessee' },
    { min: 75000, max: 79999, code: 'TX', long: 'Texas' },
    { min: 88500, max: 88599, code: 'TX', long: 'Texas' },
    { min: 84000, max: 84999, code: 'UT', long: 'Utah' },
    { min: 5000, max: 5999, code: 'VT', long: 'Vermont' },
    { min: 22000, max: 24699, code: 'VA', long: 'Virgina' },
    { min: 20000, max: 20599, code: 'DC', long: 'Washington DC' },
    { min: 98000, max: 99499, code: 'WA', long: 'Washington' },
    { min: 24700, max: 26999, code: 'WV', long: 'West Virginia' },
    { min: 53000, max: 54999, code: 'WI', long: 'Wisconsin' },
    { min: 82000, max: 83199, code: 'WY', long: 'Wyoming' },
  ];

  const state = stateZipCodes.find(({ min, max }) => zip >= min && zip <= max);
  return state?.long || '';
};
