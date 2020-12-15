import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import SingInRoutes from './SignIn.routes';
import MainAppRoutes from './MainApp.routes';

const Routes: React.FC = () => {
  const { user } = useAuth();

  const userSigned = !!user;
  console.log(user, userSigned)
  return (
    <NavigationContainer>
      {userSigned ? <MainAppRoutes /> : <SingInRoutes />}
    </NavigationContainer>
  )
};

export default Routes;
