import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { asset } = req.query;
  if (!asset) return res.status(404).end('No asset specified');
  try {
    const data = await getStaticAsset(asset);
    res.status(200).json(data);
  } catch (err) {
    console.error(`Error fetching asset: "${asset}"`, err);
    res.status(404).end(`Error fetching asset: "${asset}"`);
  }
}

export const getStaticAsset = async <T>(
  page: string | string[],
  property?: string,
): Promise<T | null> => {
  try {
    const data = await import(`/data/${page}.json`);
    if (property && data.default[property]) {
      return data.default[property] as T;
    }
    return data.default as T;
  } catch (err) {
    console.error(`Error fetching asset: "${page}"`, err);
    return null;
  }
};
