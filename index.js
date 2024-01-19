/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { createStore, configureStore } from '@reduxjs/toolkit'; 
import Store from "./src/app/store"
import noteReducer from "./src/features/notes/NoteSlice"
const store = configureStore({reducer: noteReducer,});
const ReduxApp = () => (
    <Provider store={Store}>
      <App />
    </Provider>
);
// export default ReduxApp;
AppRegistry.registerComponent(appName, () => ReduxApp);
