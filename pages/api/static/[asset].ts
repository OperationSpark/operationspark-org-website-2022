import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { asset } = req.query;

  try {
    const data = await getStaticAsset(asset);
    res.status(200).json(data);
  } catch (err) {
    console.error(`Error fetching asset: "${asset}"`, err);
    res.status(404).end(`Error fetching asset: "${asset}"`);
  }
}

export const getStaticAsset = async (
  page: string | string[],
  property?: string,
) => {
  try {
    const data = await import(`/data/${page}.json`);
    if (property && data.default[property]) {
      return data.default[property];
    }
    return data.default;
  } catch (err) {
    console.error(`Error fetching asset: "${page}"`, err);
    return null;
  }
};
