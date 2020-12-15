import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const SignInStack = createStackNavigator();

const SignInRoutes: React.FC = () => {
  return (
    <SignInStack.Navigator screenOptions={{ headerShown: false, }}>
      <SignInStack.Screen name="SignIn" component={SignIn} />
      <SignInStack.Screen name="SignUp" component={SignUp} />
    </SignInStack.Navigator>
  )
}

export default SignInRoutes;
