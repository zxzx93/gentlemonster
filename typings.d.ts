export interface Category {
	_id: string;
	_createAt: string;
	_updatedAt: string;
	_rev: string;
	_type: 'category';
	slug: {
		_type: 'slug';
		current: string;
	};
	title: string;
}

interface Image {
	_key: string;
	_type: string;
	asset: {
		url: string;
	};
}

export interface Product {
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	_type: 'product';
	title: string;
	price: number;
	slug: {
		_type: 'slug';
		current: string;
	};
	description: string;
	category: {
		_type: 'reference';
		_ref: string;
	};
	image: Image[];
	quantity: number;
	instock: number;
	like: boolean;
}

export interface StripeProducts {
	line_items: {
		id: string;
		amount_discount: number;
		amount_subtotal: number;
		checkPw;
		amount_tax: number;
		amount_total: number;
		currency: string;
		description: string;
		object: string;
		quantity: number;
		price: {
			unit_amount: number;
		};
	}[];
	customer_details: {
		address: {
			city: string;
			country: string;
			line1: string;
			line2: string;
			postal_code: string;
			state: string;
		};
		email: string;
		name: string;
		phone: string;
		tax_exempt: 'none';
		tax_ids: [];
	};
}

export interface LoginInputsForm {
	email: string;
	password: string;
}

export interface SignupInputsForm {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
}
