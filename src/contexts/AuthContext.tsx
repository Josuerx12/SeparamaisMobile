import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { IUser } from "../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export type TSignInCredentials = {
  login: string;
  password: string;
};

export type TEditUserCredentials = {
  name: string | undefined;
  phone: string | undefined;
  login: string | undefined;
  email: string | undefined;
  password: undefined | string;
  confirmPassword: undefined | string;
};

type TAuthContext = {
  user: IUser | null;
  loading: boolean;
  signIn: (credentials: TSignInCredentials) => Promise<void>;
  signOut: () => void;
  getUser: () => Promise<void>;
  editUser: ({
    id,
    newCredentials,
  }: {
    id: string;
    newCredentials: TEditUserCredentials;
  }) => Promise<void>;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});
export const AuthContextProvier = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function signIn(credentials: TSignInCredentials) {
    try {
      const token = await Notifications.getExpoPushTokenAsync();

      const loginCredentials = {
        login: credentials.login,
        password: credentials.password,
        expoToken: {
          deviceId: Constants.deviceName,
          token: token.data,
        },
      };

      const res = await api.post("/auth/login", loginCredentials);

      await AsyncStorage.setItem("token", res.data.token);

      api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      await getUser();
    } catch (error: any) {
      alert(error);
      throw error.response.data;
    }
  }

  async function editUser({
    id,
    newCredentials,
  }: {
    id: string;
    newCredentials: TEditUserCredentials;
  }) {
    try {
      const credentials: Record<string, any> = {};

      if (user && newCredentials.name && user?.name !== newCredentials.name) {
        credentials.name = newCredentials.name;
      }
      if (
        user &&
        newCredentials.email &&
        user?.email !== newCredentials.email
      ) {
        credentials.email = newCredentials.email;
      }
      if (
        user &&
        newCredentials.login &&
        user?.login !== newCredentials.login
      ) {
        credentials.login = newCredentials.login;
      }
      if (
        user &&
        newCredentials.phone &&
        user?.phone !== newCredentials.phone
      ) {
        credentials.phone = newCredentials.phone;
      }
      if (newCredentials.password) {
        credentials.password = newCredentials.password;
      }
      if (newCredentials.confirmPassword) {
        credentials.confirmPassword = newCredentials.confirmPassword;
      }

      const res = await api.put("/auth/editUser/" + id, credentials);

      console.log(res.data);
      await getUser();
    } catch (error: any) {
      console.log(JSON.stringify(error));
      throw error.response.data;
    }
  }

  async function getUser() {
    try {
      const res = await api.get("/auth/user");

      if (!res.data) {
        AsyncStorage.removeItem("token");
        api.defaults.headers.common.Authorization = "";
        setUser(null);
      }

      setUser(res.data);
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function signOut() {
    const deviceId = Constants.deviceName;

    await api.post("/auth/logout", { deviceId });
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

  const getNotificationsAuth = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
  };

  useEffect(() => {
    loadTokenFromAsyncStorage();
    getNotificationsAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, getUser, signIn, signOut, editUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
