import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "react-query";
import { TSignInCredentials, useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

type TMutationError = {
  errors: {
    login: {
      msg: string;
    };
    password: {
      msg: string;
    };
  };
};

const SignInScreen = () => {
  const [showPass, setShowPass] = useState(false);

  const [credentials, setCredentials] = useState<TSignInCredentials>({
    login: "",
    password: "",
  });

  const { signIn } = useAuth();

  const { mutateAsync, isLoading, error } = useMutation<
    any,
    TMutationError,
    TSignInCredentials
  >(["signIn"], signIn);

  const handleSubmit = async () => {
    await mutateAsync(credentials);
  };

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 mt-20 items-center">
        <View className="w-11/12 p-4 gap-y-2 rounded-md drop-shadow-2xl">
          <Text className="text-3xl font-bold text-center">Separa+</Text>
          <Text className="text-lg">
            Autentique-se para utilizar nosso app de logistica!
          </Text>

          <View>
            <View className="flex-col gap-2">
              <Text className="text-lg">Login</Text>
              <TextInput
                onChangeText={(text) =>
                  setCredentials((prev) => ({
                    ...prev,
                    login: text,
                  }))
                }
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="#fff"
                value={credentials.login}
                className="bg-blue-700 text-white px-2 h-[40px] rounded"
                placeholder="Insira seu login!"
              />
              {error && error.errors?.login && (
                <Text className="bg-red-900 rounded-md text-white p-2 text-justify">
                  {error.errors.login.msg}
                </Text>
              )}
            </View>

            <View className="flex-col gap-2 mt-1">
              <Text className="text-lg">Senha</Text>
              <View className="flex flex-nowrap flex-row items-center">
                <TextInput
                  onChangeText={(text) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: text,
                    }))
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor="#fff"
                  value={credentials.password}
                  className="bg-blue-700 text-white px-2 h-[40px] rounded flex-grow mr-2"
                  placeholder="Insira sua senha!"
                  secureTextEntry={!showPass}
                />
                <View className="bg-blue-700  px-1 rounded items-center justify-center h-[40px]">
                  <Ionicons
                    onPress={() => setShowPass((prev) => !prev)}
                    name={showPass ? "eye-off" : "eye"}
                    size={30}
                    color="#fff"
                  />
                </View>
              </View>
              {error && error.errors?.password && (
                <Text className="bg-red-900 rounded-md text-white p-2 text-justify">
                  {error.errors.password.msg}
                </Text>
              )}
            </View>

            {error && !error.errors?.password && !error.errors?.login && (
              <Text className="bg-red-900 rounded-md text-white p-2 mt-4 text-justify">
                {error.errors?.toString()}
              </Text>
            )}

            <TouchableOpacity
              className="bg-blue-700 mt-4 p-2 justify-center items-center rounded"
              onPress={handleSubmit}
            >
              <Text className="text-lg text-white font-bold">Fazer Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
