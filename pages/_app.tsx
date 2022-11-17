import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import '../styles/globals.css';
import { store } from '../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const persistor = persistStore(store);
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Toaster />
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
