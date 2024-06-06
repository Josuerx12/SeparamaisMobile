import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TEditUserCredentials, useAuth } from "../../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";

const EditUserScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return;
  }

  const [changePassword, setChangePassword] = useState(false);

  const [newCredentials, setNewCredentials] = useState<TEditUserCredentials>({
    name: user?.name,
    phone: user?.phone,
    login: user?.login,
    email: user?.email,
    password: undefined,
    confirmPassword: undefined,
  });

  const { editUser } = useAuth();
  const { navigate } = useNavigation();

  const { mutateAsync, isLoading } = useMutation(["editUser"], editUser, {
    onSuccess: () => {
      alert("Usuário editado com sucesso!");
      navigate("settings");
    },
  });

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text className="text-lg text-center text-neutral-700 font-semibold mt-4">
          Usuário ID: {user?._id}
        </Text>

        <View className="w-11/12 mx-auto mt-4">
          <Text className="text-neutral-700 font-bold">Nome do Usuário</Text>
          <TextInput
            defaultValue={newCredentials.name}
            onChangeText={(text) =>
              setNewCredentials((prev) => ({ ...prev, name: text }))
            }
            className="p-2 bg-neutral-50 mt-2 w-full mx-auto rounded-md shadow-sm shadow-black"
          />
        </View>
        <View className="w-11/12 mx-auto mt-4">
          <Text className="text-neutral-700 font-bold">
            Telefone do Usuário
          </Text>
          <TextInput
            onChangeText={(text) =>
              setNewCredentials((prev) => ({ ...prev, phone: text }))
            }
            defaultValue={newCredentials.phone}
            className="p-2 bg-neutral-50 mt-2 w-full mx-auto rounded-md shadow-sm shadow-black"
          />
        </View>
        <View className="w-11/12 mx-auto mt-4">
          <Text className="text-neutral-700 font-bold">Login do Usuário</Text>
          <TextInput
            onChangeText={(text) =>
              setNewCredentials((prev) => ({ ...prev, login: text }))
            }
            defaultValue={newCredentials.login}
            className="p-2 bg-neutral-50 mt-2 w-full mx-auto rounded-md shadow-sm shadow-black"
          />
        </View>
        <View className="w-11/12 mx-auto mt-4">
          <Text className="text-neutral-700 font-bold">Email do Usuário</Text>
          <TextInput
            onChangeText={(text) =>
              setNewCredentials((prev) => ({ ...prev, email: text }))
            }
            defaultValue={newCredentials.email}
            className="p-2 bg-neutral-50 mt-2 w-full mx-auto rounded-md shadow-sm shadow-black"
          />
        </View>

        {changePassword && (
          <View className="w-11/12 mx-auto mt-4 flex-row justify-center items-center flex-wrap">
            <View className="basis-[45%] flex-grow mx-auto mr-4">
              <Text className="text-neutral-700 font-bold">Nova Senha</Text>
              <TextInput
                onChangeText={(text) =>
                  setNewCredentials((prev) => ({ ...prev, password: text }))
                }
                placeholder="*******"
                placeholderTextColor={"#000"}
                defaultValue={newCredentials.password}
                className="p-2 bg-neutral-50 mt-2 w-full mx-auto rounded-md shadow-sm shadow-black"
              />
            </View>
            <View className=" basis-[45%] flex-grow  mx-auto">
              <Text className="text-neutral-700 font-bold">
                Confirmar Senha
              </Text>
              <TextInput
                onChangeText={(text) =>
                  setNewCredentials((prev) => ({
                    ...prev,
                    confirmPassword: text,
                  }))
                }
                defaultValue={newCredentials.confirmPassword}
                placeholder="*******"
                placeholderTextColor={"#000"}
                className="p-2 bg-neutral-50 mt-2 w-full mx-auto rounded-md shadow-sm shadow-black"
              />
            </View>
          </View>
        )}

        <View className="flex-row w-11/12 mx-auto flex-wrap">
          <TouchableOpacity
            onPress={
              changePassword
                ? () => setChangePassword((prev) => !prev)
                : () => setChangePassword((prev) => !prev)
            }
            className={`${
              changePassword ? "bg-red-700" : "bg-blue-700"
            } mx-auto basis-[45%] mr-2 flex-grow py-2 px-3 shadow-sm shadow-blue-300 rounded-full flex-row items-center justify-center font-bold my-4`}
          >
            <Text className="capitalize font-bold  text-white text-lg text-center mr-2">
              {changePassword ? "Cancelar Alteração" : "Alterar Senha"}
            </Text>
            <Ionicons name="key" color={"#fff"} size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () =>
              await mutateAsync({
                id: user._id,
                newCredentials: newCredentials,
              })
            }
            className={`bg-green-700 basis-[45%] flex-grow mx-auto py-2 px-3 shadow-sm shadow-blue-300 rounded-full flex-row items-center justify-center font-bold my-4`}
          >
            <Text className="capitalize font-bold  text-white text-lg text-center mr-2">
              Salvar
            </Text>
            <Ionicons name="save" color={"#fff"} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditUserScreen;
