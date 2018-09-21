import React from 'react';
import {Text,BackHandler,View, UIManager} from 'react-native';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import DashboardView from './DashboardView';
import PlaybackView from './PlaybackView';

import {
    createStackNavigator,
  } from 'react-navigation';


const App = FluidNavigator({
    Home: { screen: DashboardView },
    Player: { screen: PlaybackView },
  });


export default App;