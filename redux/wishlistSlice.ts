import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../typings';
import type { RootState } from './store';

export interface WishlistState {
	items: Product[];
}

const initialState: WishlistState = {
	items: [],
};

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		addToWishlist: (state: WishlistState, action: PayloadAction<Product>) => {
			state.items = [...state.items, action.payload];
		},
		removeToWishlist: (
			state: WishlistState,
			action: PayloadAction<Product>
		) => {
			const newWisilists = [...state.items];
			const remove = newWisilists.filter(
				item => item._id !== action.payload._id
			);
			state.items = remove;
		},
	},
});

export const { addToWishlist, removeToWishlist } = wishlistSlice.actions;

// selectors
export const selectWishListItems = (state: RootState) => state.wishlist.items;

export default wishlistSlice.reducer;
