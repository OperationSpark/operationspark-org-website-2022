import {
  sheets as googleSheets,
  auth as Auth,
  sheets_v4,
} from '@googleapis/sheets';

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

export const getAuth = () =>
  new Auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

export const getSheets = () => googleSheets({ version: 'v4', auth: getAuth() });

export const randomPastel = () => {
  const rnd = () => Math.round(Math.random() * 127) + 127;
  return {
    red: rnd(),
    green: rnd(),
    blue: rnd(),
  };
};

export const splitCamelCase = (str: string) => {
  let output = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (i === 0) {
      output += char.toUpperCase();
    } else if (/[A-Z]/.test(char)) {
      output += ` ${char}`;
    } else {
      output += char;
    }
  }
  return output;
};

type TabArgs = {
  /** Sheets object `getSheets()` */
  sheets: sheets_v4.Sheets;
  /** Id of spreadsheet */
  spreadsheetId: string;
  tabName: string;
  header: string[];
};

export const createSpreadsheetTab = async ({
  sheets,
  spreadsheetId,
  tabName,
  header,
}: TabArgs) => {
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: tabName,
                tabColor: randomPastel(),
              },
            },
          },
        ],
      },
    });

    const values = header.map(splitCamelCase);

    await addRow({ sheets, spreadsheetId, tabName, values });
  } catch (err) {
    console.error(`Sheet "${tabName}" already exists.`);
  }
};

type AddRowArgs = {
  /** Sheets object `getSheets()` */
  sheets: sheets_v4.Sheets;
  /** Id of spreadsheet */
  spreadsheetId: string;
  /** Tab to append row */
  tabName: string;
  /** Array of strings represents a row appended to spreadsheet */
  values: string[];
};
export const addRow = async ({
  sheets,
  spreadsheetId,
  tabName,
  values,
}: AddRowArgs) => {
  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: tabName,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        majorDimension: 'ROWS',
        values: [values],
      },
    });
    return result.data;
  } catch (err) {
    console.error('Error writing to spreadsheet', err);
  }
};
