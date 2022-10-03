import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// import { formatAmountForStripe } from '../../../utils/stripe-helpers';
import { Product } from '../../typings';
import { urlFor } from '../../sanity';

const stripe = new Stripe(process.env.NEXT_PUBLIC_SANITY_SECRET_KEY!, {
	apiVersion: '2022-08-01',
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { items }: { items: Product[] } = req.body;

		const transformItems = items.map(item => ({
			price_data: {
				currency: 'krw', // 원화
				product_data: {
					name: item.title,
					images: [urlFor(item.image[0]).url()],
				},
				unit_amount: item.price, // 원화는 zero-decimal currencies *100 할 필요없음
			},
			quantity: 1,
		}));

		try {
			// Create Checkout Sessions from body params.
			const params: Stripe.Checkout.SessionCreateParams = {
				mode: 'payment',
				submit_type: 'donate',
				payment_method_types: ['card'],
				payment_intent_data: {},
				line_items: transformItems,
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/cart`,
				metadata: {
					images: JSON.stringify(items.map(item => item.image[0].asset.url)),
				},
			};

			const checkoutSession: Stripe.Checkout.Session =
				await stripe.checkout.sessions.create(params);

			res.status(200).json(checkoutSession);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Internal server error';
			res.status(500).json({ statusCode: 500, message: errorMessage });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
