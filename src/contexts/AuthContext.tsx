import {
  useState,
  createContext,
  useContext,
  Children,
  ReactNode,
  useEffect,
} from "react";
import { IUser } from "../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

export type TSignInCredentials = {
  login: string;
  password: string;
};

type TAuthContext = {
  user: IUser | null;
  loading: boolean;
  signIn: (credentials: TSignInCredentials) => Promise<void>;
  signOut: () => void;
  getUser: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthContextProvier = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function signIn(credentials: TSignInCredentials) {
    try {
      const res = await api.post("/auth/login", credentials);

      await AsyncStorage.setItem("token", res.data.token);

      api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

      await getUser();
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function getUser() {
    try {
      const res = await api.get("/auth/user");

      setUser(res.data);
    } catch (error: any) {
      throw error.response.data;
    }
  }

  function signOut() {
    AsyncStorage.removeItem("token");
    setUser(null);
    api.defaults.headers.common.Authorization = "";
  }

  const loadTokenFromAsyncStorage = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      await getUser();
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTokenFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
