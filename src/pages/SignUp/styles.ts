import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { getBottomSpace,  getStatusBarHeight } from 'react-native-iphone-x-helper';
import { darken, lighten } from 'polished';

const {width: screenWidth} = Dimensions.get('screen');

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.View`
  align-items: center;
  flex: 1;
  padding-top: ${() => {
    return getStatusBarHeight() + 16;
  }};
  padding-bottom: ${() => {
    return getBottomSpace() + 8;
  }};
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: 22px 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.titleTextColor};
  font-size: 42px;
  font-weight: bold;
`;

export const SignUpContainer = styled.View`
  width: 80%;
`;

export const InputContainer = styled.View`
  height: 55px;
  width: 100%;
  background: ${({ theme }) => {
    return theme.colors.secondaryBackground;
  }};
  border-radius: 8;
  border: solid 1px ${({ theme }) => darken(0.1, theme.colors.secondaryBackground)};
  padding: 8px 16px;
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
`;

export const SignUpButton = styled(RectButton)`
  background: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  height: 55px;
  border-radius: 8px;
`;

export const SignUpButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryTextColor};
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2.5px;
`;

export const GoBackButton = styled(RectButton)`
  background: ${({ theme }) => lighten(0.2, theme.colors.secondary)};
  align-items: center;
  justify-content: center;
  height: 55px;
  border-radius: 8px;
  margin-top: 16px;
`;

export const GoBackButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2.5px;
`;
