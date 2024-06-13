import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { TNewReqCredentials } from "../../../interfaces/Request";
import { useMutation, useQueryClient } from "react-query";
import { useRequests } from "../../../hooks/useRequests";

type MutationError = {
  exitID: { msg: string };
  collectorPhone: { msg: string };
  collectForecast: { msg: string };
  desc: { msg: string };
};

const CreateRequestScreen = () => {
  const [isVisible, setIsVisible] = useState(
    Platform.OS === "ios" ? true : false
  );
  const [credentials, setCredentials] = useState({
    exitID: "",
    collectorPhone: "",
    collectForecast: new Date(),
    desc: "",
  });

  const { navigate } = useNavigation();

  const query = useQueryClient();
  const { newReq } = useRequests();

  const { mutateAsync, error, isLoading, reset } = useMutation<
    any,
    MutationError,
    TNewReqCredentials
  >(["createNewRequest"], newReq, {
    onSuccess: () =>
      Promise.all([
        query.invalidateQueries("userRequests"),
        cleanTypedCredentials(),
        navigate("requests"),
      ]),
  });

  function cleanTypedCredentials() {
    setCredentials({
      exitID: "",
      collectorPhone: "",
      collectForecast: new Date(),
      desc: "",
    });
    reset();
  }

  async function handleSubmit() {
    await mutateAsync(credentials);
  }

  return (
    <KeyboardAwareScrollView className="flex flex-col">
      <SafeAreaView className="mb-20">
        <View className="w-11/12 mx-auto rounded-lg p-4 bg-black/10 ">
          {(credentials.exitID ||
            credentials.collectorPhone ||
            credentials.desc) && (
            <TouchableOpacity onPress={cleanTypedCredentials}>
              <View className="bg-blue-600 rounded-full shadow shadow-black w-full mb-4  mx-auto p-2">
                <Text className="text-center text-white">Limpar dados</Text>
              </View>
            </TouchableOpacity>
          )}
          <View>
            <Text className="mb-2 font-semibold text-neutral-700">
              ID de Saída{" "}
            </Text>

            <TextInput
              defaultValue={String(credentials.exitID)}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, exitID: text }))
              }
              keyboardType="numeric"
              placeholder="Digite a ID de saída para separação!"
              placeholderTextColor={"#999"}
              className="bg-neutral-50 h-10 w-full  rounded-md p-2"
            />
            {error?.exitID && (
              <View className="bg-red-900 rounded-md mt-3 w-full p-2">
                <Text className=" text-white font-semibold">
                  Error:
                  <Text className="font-normal text-sm">
                    {" "}
                    {error?.exitID.msg}
                  </Text>
                </Text>
              </View>
            )}
          </View>
          <View className="my-4 ">
            <Text className="mb-2 font-semibold text-neutral-700">
              Telefone do coletor{" "}
            </Text>
            <TextInput
              keyboardType="numeric"
              defaultValue={credentials.collectorPhone}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, collectorPhone: text }))
              }
              placeholder="22990079533"
              placeholderTextColor={"#999"}
              className="bg-neutral-50 h-10 w-full  rounded-md p-2"
            />
            {error?.collectorPhone && (
              <View className="bg-red-900 rounded-md mt-3 w-full p-2">
                <Text className=" text-white font-semibold">
                  Error:
                  <Text className="font-normal text-sm">
                    {" "}
                    {error?.collectorPhone.msg}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          <View>
            <Text
              className={`${
                Platform.OS === "ios" && "text-center"
              } font-semibold text-neutral-700`}
            >
              Data prevista de coleta
            </Text>
            {Platform.OS === "android" && (
              <TextInput
                editable={false}
                defaultValue={new Date(
                  credentials.collectForecast
                ).toLocaleDateString("pt-BR")}
                className="bg-neutral-200 text-black/70 h-10 w-full mt-2  rounded-md p-2"
              />
            )}
            {error?.collectForecast && (
              <View className="bg-red-900 rounded-md mt-3 w-full p-2">
                <Text className=" text-white font-semibold">
                  Error:
                  <Text className="font-normal text-sm">
                    {" "}
                    {error?.collectForecast.msg}
                  </Text>
                </Text>
              </View>
            )}
            {Platform.OS === "android" && (
              <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
                <View className="bg-neutral-500  rounded-full  shadow mt-4 mx-auto p-2">
                  <Text className="text-center text-white">
                    Selecionar Data de Coleta
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {isVisible && (
              <View className="mx-auto mt-4">
                <DatePicker
                  testID="dateTimePicker"
                  mode="date"
                  is24Hour
                  display="default"
                  onChange={(e, selectedDate?: Date) => {
                    setIsVisible(Platform.OS === "ios");
                    if (selectedDate) {
                      setCredentials((prev) => ({
                        ...prev,
                        collectForecast: selectedDate,
                      }));
                    }
                  }}
                  value={credentials.collectForecast}
                />
              </View>
            )}
          </View>

          <View className="my-4">
            <Text className="mb-2 font-semibold text-neutral-700">
              Descrição:{" "}
            </Text>
            <TextInput
              value={credentials.desc}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, desc: text }))
              }
              multiline
              placeholder="Digite alguma descrição aqui!"
              placeholderTextColor={"#999"}
              style={{ textAlignVertical: "top" }}
              className="bg-neutral-50 h-36 w-full rounded-md p-2"
            />
            {error?.desc && (
              <View className="bg-red-900 rounded-md mt-3 w-full p-2">
                <Text className=" text-white font-semibold">
                  Error:
                  <Text className="font-normal text-sm">
                    {" "}
                    {error?.desc.msg}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity disabled={isLoading} onPress={handleSubmit}>
            <View className=" flex-row justify-center items-center p-2 w-full shadow shadow-black mx-auto rounded-full bg-blue-600">
              <Text className="text-white text-lg mr-2">
                {isLoading ? <>Solicitando</> : <>Solicitar Separação</>}
              </Text>
              {isLoading && <ActivityIndicator size="small" color="#fff" />}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreateRequestScreen;
