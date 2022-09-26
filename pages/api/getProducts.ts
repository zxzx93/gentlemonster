import { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { Product } from '../../typings.d';
import { sanityClient } from '../../sanity';

const query = groq`*[_type == "product"] {
_id,
  ...
} | order(_createAt asc)`; // 오름차순으로 새로운 상품부터 가져옴

type Data = {
	products: Product[];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const products: Product[] = await sanityClient.fetch(query);

	res.status(200).json({ products });
}
