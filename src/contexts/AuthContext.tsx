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

type TAuthContext = {
  user: IUser | null;
  loading: boolean;
  signIn: (credentials: TSignInCredentials) => Promise<void>;
  signOut: () => void;
  getUser: () => Promise<void>;
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
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
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

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

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
