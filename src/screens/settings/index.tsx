import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const { user, signOut } = useAuth();

  const { navigate } = useNavigation();

  if (!user) {
    return;
  }

  return (
    <SafeAreaView>
      <View className="w-full h-full justify-center items-center">
        <View className="w-11/12 rounded-md justify-center items-center bg-black/10 border p-4">
          <Image
            className="w-32 h-32 rounded-full shadow-2xl shadow-black"
            source={require("../../assets/profile.png")}
          />
          <View className="my-5 w-full">
            <Text className="text-center text-xl my-4 font-semibold text-blue-700">
              Dados do Usuário
            </Text>
            <Text className="font-semibold">
              Nome do usuário:{" "}
              <Text className="font-normal text-neutral-600">{user?.name}</Text>
            </Text>
            <Text className="font-semibold">
              Email:{" "}
              <Text className="font-normal text-neutral-600">
                {user?.email}
              </Text>
            </Text>
            <Text className="font-semibold">
              Telefone:{" "}
              <Text className="font-normal text-neutral-600">
                {user?.phone}
              </Text>
            </Text>
            <Text className="font-semibold">
              Criado em:{" "}
              <Text className="font-normal text-neutral-600">
                {new Date(user?.createdAt).toLocaleString("pt-BR")}
              </Text>
            </Text>
            <Text className="font-semibold">
              Ultima atualização:
              <Text className="font-normal text-neutral-600">
                {" "}
                {new Date(user.updatedAt).toLocaleString("pt-BR")}
              </Text>
            </Text>
          </View>
          <View className="flex-row gap-2 flex-wrap">
            <TouchableOpacity
              onPress={() => navigate("editUser")}
              className=" bg-blue-500 p-2 rounded-md flex-grow basis-[45%] flex-row items-center justify-center gap-x-2"
            >
              <Text className="text-lg text-white ">Alterar Dados</Text>
              <FontAwesome name="pencil" size={20} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signOut}
              className="bg-red-500 p-2 rounded-md flex-grow basis-[45%] flex-row items-center justify-center gap-x-2"
            >
              <Text className="text-lg text-white ">Sair</Text>
              <FontAwesome name="sign-out" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
