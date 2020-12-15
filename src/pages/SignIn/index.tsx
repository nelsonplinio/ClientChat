import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Alert,
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import { useAuth } from '../../hooks/auth';
import { 
  Container,
  ScrollContainer,
  Logo,
  SignInContainer,
  InputContainer,
  Input,
  SignInButton,
  SignInButtonText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

import logoImg from '../../assets/chat_logo.png';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }, [email, password]);

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={{ flex: 1 }}>
      <ScrollContainer 
        contentContainerStyle={{ flex: 1, }}
        keyboardDismissMode="interactive"
      >
        <Container>
          <Logo source={logoImg} />
          <SignInContainer>
            <InputContainer>
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </InputContainer>

            <InputContainer>
              <Input 
                placeholder="Senha" 
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </InputContainer>

            <SignInButton onPress={handleSignIn}>
              {loading 
                ? (<ActivityIndicator size="small" color="#fff" />) 
                : (<SignInButtonText>ENTRAR</SignInButtonText>)
              }
            </SignInButton>

            <SignUpButton onPress={navigateToSignUp}>
                <SignUpButtonText>Não tenho cadastro</SignUpButtonText>
            </SignUpButton>
          </SignInContainer>
        </Container>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

export default SignIn;