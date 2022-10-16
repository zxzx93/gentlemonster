import { configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// SessionStorage 사용의 경우 import storageSession from 'redux-persist/lib/storage/session
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	// if you do not want to persist this part of the state
	// blacklist: ['wishlist'],
};

const reducer = combineReducers({
	cart: cartReducer,
	wishlist: wishlistReducer,
	// not persisting this reducer
	// omitedPart: OmitReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
