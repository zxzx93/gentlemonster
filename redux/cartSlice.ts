import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../typings';
import type { RootState } from './store';

export interface CartState {
	items: Product[];
}

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state: CartState, action: PayloadAction<Product>) => {
			state.items = [...state.items, action.payload];
		},
		removeAllToCart: (
			state: CartState,
			action: PayloadAction<{ id: string }>
		) => {
			const newCart = [...state.items];
			const removeAll = newCart.filter(item => item._id !== action.payload.id);

			state.items = removeAll;
		},
		incQty: (state: CartState, action: PayloadAction<{ id: string }>) => {
			const updatedQtyItems = state.items.map(cartProduct => {
				if (cartProduct._id === action.payload.id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + 1,
					};
				return { ...cartProduct };
			});
			state.items = updatedQtyItems;
		},

		decQty: (state: CartState, action: PayloadAction<{ id: string }>) => {
			const updatedQtyItems = state.items.map(cartProduct => {
				if (cartProduct._id === action.payload.id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity - 1,
					};
				return { ...cartProduct };
			});
			state.items = updatedQtyItems;
		},
	},
});

export const { addToCart, removeAllToCart, incQty, decQty } = cartSlice.actions;

// selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
	state.cart.items.reduce(
		(total: number, item: Product) => (total += item.price * item.quantity),
		0
	);
export const selectBasketItemsWithId = (state: RootState, id: string) => {
	state.cart.items.filter((item: Product) => item._id === id);
};

export default cartSlice.reducer;
