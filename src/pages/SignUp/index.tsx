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
  Header,
  Title,
  ScrollContainer,
  SignUpContainer,
  InputContainer,
  Input,
  SignUpButton,
  SignUpButtonText,
  GoBackButton,
  GoBackButtonText,
} from './styles';


const SignUp: React.FC = () => {
  const { signUp } = useAuth();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    try {
      await signUp({ email, password, name });
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
          <Header>
            <Title>Cadastro</Title>
          </Header>
          <SignUpContainer>
            <InputContainer>
              <Input 
                placeholder="Nome" 
                autoCapitalize="words"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </InputContainer>

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

            <SignUpButton onPress={handleSignUp}>
              {loading 
                ? (<ActivityIndicator size="small" color="#fff" />) 
                : (<SignUpButtonText>Cadastrar</SignUpButtonText>)
              }
            </SignUpButton>

            <GoBackButton onPress={navigation.goBack}>
              <GoBackButtonText>Já tenho conta</GoBackButtonText>
            </GoBackButton>
          </SignUpContainer>
        </Container>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

export default SignUp;