import { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { Product } from '../../../typings';
import { sanityClient } from '../../../sanity';

const contentDetailQuery = (id: string) => {
	const query = groq`*[_type == "product" && _id == '${id}'] {
_id,
  ...
}`;
	return query;
};

type Data = {
	detail: Product;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'GET') {
		const id = req.query.id as string;

		const query = contentDetailQuery(id);
		const detail = await sanityClient.fetch(query);
		res.status(200).json(detail[0]);
	}
}
