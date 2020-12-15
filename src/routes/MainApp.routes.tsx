import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageList from '../pages/MessageList';
import FriendList from '../pages/FriendList';
import Profile from '../pages/Profile';
import getTheme from '../theme';

const MainAppTab = createBottomTabNavigator();

const iconsMap = {
  MessageList: {
    active: 'chatbubble-sharp',
    inactive: 'chatbubble-outline'
  },
  FriendList: {
    active: 'ios-people',
    inactive: 'ios-people-outline'
  },
  Profile: {
    active: 'ios-person',
    inactive: 'ios-person-outline'
  },
}
const MainAppRoutes: React.FC = () => { 
  const theme = getTheme();
  return (
    <MainAppTab.Navigator 
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondaryTextColor,
      }}
      screenOptions={ (router) => {
        return {
          tabBarIcon: ({ color, size, focused }) => {
            return <Icon 
              color={color}
              size={size}
              name={iconsMap[router.route.name][focused ? 'active' : 'inactive']}
            />
          }
        };
      }}
    >
      <MainAppTab.Screen 
        name="MessageList"
        component={MessageList}
        options={{
          title: 'Conversas'
        }}
      />

      <MainAppTab.Screen 
        name="FriendList"
        component={FriendList}
        options={{
          title: 'Amigos'
        }}
      />

      <MainAppTab.Screen 
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil'
        }}
      />

    </MainAppTab.Navigator>
  )
}

export default MainAppRoutes;