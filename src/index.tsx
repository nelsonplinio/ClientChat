import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components'
import { } from '@react-native-firebase/app';
import getTheme from './theme';
import Routes from './routes';
import { AuthProvider } from './hooks/auth';

export default function App() {
  const themeSelected = 'light';

  const theme = getTheme(themeSelected);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
