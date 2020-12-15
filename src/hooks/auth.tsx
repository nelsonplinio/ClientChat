import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import localStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/firestore';
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

interface SignUpData {
  email: string;
  name: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signOut(): void;
  signUp(signUpData: SignUpData): Promise<void>;
  updateUser(user: Partial<User>): void;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(
    { loadingUserData: true } as AuthState
  );

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const userLogged = 
        await auth().signInWithEmailAndPassword(email, password);

      const { uid: id } = userLogged.user;

      const { name } = (await storage().collection('users').doc(id).get()).data();
      
      setData({
        user: { 
          id,
          email,
          name,
        },
      })
    } catch (error) {
      throw new Error(`Não foi possivel conectar na sua conta "${email}".\n
        E-mail ou senha está incorreta!!
        error ${error}
      `)
    }
  }, []);

  const signOut = useCallback(async () => {
    setData({} as AuthState);
    auth().signOut();
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

  const signUp = useCallback(async ({ email, password, name }: SignUpData) => {
    try {
      const signUpResult = await auth()
        .createUserWithEmailAndPassword(email, password);
      
      storage()
        .collection('users')
        .doc(signUpResult.user.uid)
        .set({
          name,
          email,
        });
      
      setData({
        user: {
          name,
          email,
          id: signUpResult.user.uid,
        }
      })
    } catch (error) {
      throw new Error(`Não foi possivel criar sua conta\nerror ${error}`)
    }
  }, []);
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

  useEffect(() => {
    if (!data.user) {
      localStorage.removeItem('@ClientChat:user');
      return;
    }

    localStorage.setItem('@ClientChat:user', JSON.stringify(data.user));
  }, [data]);


  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, signUp }}
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