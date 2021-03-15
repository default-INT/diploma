import React from 'react';
import {Provider} from 'react-redux';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';

import AppNavigator from "./navigation/AppNavigator";
import {store} from './store'

export default function App() {
  return (
      <OverflowMenuProvider>
          <Provider store={store}>
              <AppNavigator />
          </Provider>
      </OverflowMenuProvider>

  );
}
