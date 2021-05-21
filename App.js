import React from 'react';
import {Provider} from 'react-redux';
import { enableScreens  } from 'react-native-screens';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';

import AppNavigator from "./navigation/AppNavigator";
import {initAxios} from "./utils";
import {store} from './store'

enableScreens();
initAxios();

export default function App() {

    return (
      <OverflowMenuProvider>
          <Provider store={store}>
              <AppNavigator />
          </Provider>
      </OverflowMenuProvider>

    );
}
