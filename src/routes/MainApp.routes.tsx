import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MessageList from '../pages/MessageList';

const MainAppTab = createBottomTabNavigator();

const MainAppRoutes: React.FC = () => {
  return (
    <MainAppTab.Navigator>
      <MainAppTab.Screen name="MessageList" component={MessageList} />
    </MainAppTab.Navigator>
  )
}

export default MainAppRoutes;