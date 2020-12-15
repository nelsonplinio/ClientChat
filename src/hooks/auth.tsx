import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import localStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
interface User {
  id: string;
  avatar_url?: string;
  name: string;
  email: string;
}
interface AuthState {
  // token: string;
  user: User;
  loadingUserData?: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signOut(): void;
  updateUser(user: Partial<User>): void;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(
    { loadingUserData: true } as AuthState
  );


  useEffect(() => {
    const loadUserData = async () => {
      // const token = await localStorage.getItem('@ClientChat:token');
      const user = await localStorage.getItem('@ClientChat:user');
      console.log(user)
      if (user) {
        // api.defaults.headers.authorization = `Bearer ${token}`;
        setData({
          // token,
          user: JSON.parse(user),
          loadingUserData: false,
        });
        return;
      }

      setData(
        { loadingUserData: false } as AuthState
      )
    };

    loadUserData();
  }, []);


  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      console.log(email, password)
      const userLogged = 
        await auth().signInWithEmailAndPassword(email, password);

      const { displayName, uid: id } = userLogged.user;

      setData({
        user: { 
          id,
          email,
          name: displayName,
        },
      })
    } catch (error) {
      throw new Error(`Não foi possivel conectar na sua conta "${email}".\n
        E-mail ou senha está incorreta!!
        error ${error}
      `)
    }

    
    // const response = await api.post('/sessions', { email, password });

    // const { token, user } = response.data;

    // api.defaults.headers.authorization = `Bearer ${token}`;

    // setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    auth().signOut();
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (userUpdate: Partial<User>) => {
      setData({
        // token: data.token,
        user: {
          ...data.user,
          ...userUpdate,
        },
        loadingUserData: false,
      });
    },
    [data, setData],
  );

  useEffect(() => {
    if (!data.user) {
      return;
    }
    // localStorage.setItem('@ClientChat:token', data.token);
    localStorage.setItem('@ClientChat:user', JSON.stringify(data.user));
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };