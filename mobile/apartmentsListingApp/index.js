import { AppRegistry } from 'react-native';
import AppWrapper from './App'; // Import the AppWrapper component
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
