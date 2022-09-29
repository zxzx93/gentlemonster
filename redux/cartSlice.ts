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
		removeToCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
			const idx = state.items.findIndex(
				(item: Product) => item._id === action.payload.id,
			);

			const newCart = [...state.items];
			if (idx >= 0) {
				newCart.slice(idx, 1);
			} else {
				console.log(`${id}는 카트에서 삭제 할수 없습니다.`);
			}

			state.items = newCart;
		},
	},
});

export const { addToCart, removeToCart } = cartSlice.actions;

// selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
