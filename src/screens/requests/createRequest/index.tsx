import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  FontAwesome,
  Ionicons,
  createIconSetFromFontello,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-modal-datetime-picker";
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
  const [isVisible, setIsVisible] = useState(false);
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
    <KeyboardAwareScrollView className="flex flex-col gap-y-5">
      <SafeAreaView>
        <View className="mt-4">
          <Text className="text-2xl font-semibold text-center text-black/60">
            Nova solicitação
          </Text>
        </View>
        <View className="w-11/12 mx-auto rounded-lg p-4 mt-5 bg-black/10 border ">
          {(credentials.exitID ||
            credentials.collectorPhone ||
            credentials.desc) && (
            <View>
              <Button title="Limpar dados" onPress={cleanTypedCredentials} />
            </View>
          )}
          <View>
            <Text className="mb-2 font-semibold">ID de Saída </Text>

            <TextInput
              value={String(credentials.exitID)}
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
            <Text className="mb-2 font-semibold">Telefone do coletor </Text>
            <TextInput
              keyboardType="numeric"
              value={credentials.collectorPhone}
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
            <Text className=" font-semibold">Data prevista de coleta</Text>
            <TextInput
              editable={false}
              value={new Date(credentials.collectForecast).toLocaleDateString(
                "pt-BR"
              )}
              className="bg-neutral-200 h-10 w-full mt-2  rounded-md p-2"
            />
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
            <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
              <View className="bg-neutral-400 border rounded-full border-black/20 shadow shadow-black mt-2 mx-auto p-2">
                <Text className="text-center text-white">
                  Selecionar Data de Coleta
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePicker
              date={new Date(credentials.collectForecast)}
              isVisible={isVisible}
              onCancel={() => setIsVisible((prev) => !prev)}
              onConfirm={(date) => {
                setCredentials((prev) => ({ ...prev, collectForecast: date }));
                setIsVisible(false);
              }}
            />
          </View>

          <View className="my-4">
            <Text className="mb-2 font-semibold">Descrição: </Text>
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
            <View className="rounded-lg flex-row justify-center items-center p-2 bg-blue-500">
              <Text className="text-white text-lg">
                {isLoading ? <>Aguarde...</> : <>Solicitar Separação</>}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreateRequestScreen;
