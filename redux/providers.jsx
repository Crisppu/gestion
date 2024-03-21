"use client";
import { Provider } from 'react-redux'
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

var persistor = persistStore(store);
export function Providers({children}) {
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
          {children}
          </PersistGate>
        </Provider>
    )
}

export default Providers

