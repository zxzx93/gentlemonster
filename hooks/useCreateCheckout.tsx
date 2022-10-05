import { useState } from 'react';
import { useSelector } from 'react-redux';
import Stripe from 'stripe';
import fetchPostJSON from '../utils/api-helpers';
import getStripe from '../utils/get-stripejs';
import { selectCartItems } from '../redux/cartSlice';

const useCreateCheckout = () => {
	const items = useSelector(selectCartItems);
	const [loading, setLoading] = useState(false);

	const createCheckout = async () => {
		setLoading(true);
		// Create a Checkout Session.
		const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
			'/api/checkout_sessions',
			{ items }
		);

		// Internal server error
		if ((checkoutSession as any).statusCode === 500) {
			console.error((checkoutSession as any).message);
			return;
		}

		// Redirect to Checkout.
		const stripe = await getStripe();
		const { error } = await stripe!.redirectToCheckout({
			sessionId: checkoutSession.id,
		});
		console.warn(error.message);

		setLoading(false);
	};
	return { createCheckout, loading };
};

export default useCreateCheckout;
