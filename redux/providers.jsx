"use client";
import { Provider } from 'react-redux'
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SessionProvider } from 'next-auth/react';
import {NextUIProvider} from '@nextui-org/react'


var persistor = persistStore(store);
export function Providers({children}) {
    return (
        <NextUIProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </PersistGate>
            </Provider>
        </NextUIProvider>
    )
}

export default Providers

