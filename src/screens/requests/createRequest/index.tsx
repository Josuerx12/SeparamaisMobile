import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
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
  const [credentials, setCredentials] = useState<TNewReqCredentials>({
    exitID: undefined,
    collectorPhone: undefined,
    collectForecast: new Date(),
    desc: undefined,
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
      exitID: undefined,
      collectorPhone: undefined,
      collectForecast: new Date(),
      desc: undefined,
    });
    reset();
  }

  async function handleSubmit() {
    await mutateAsync(credentials);
  }

  return (
    <KeyboardAwareScrollView className="flex flex-col gap-y-5">
      <SafeAreaView>
        <View>
          <Text className="text-2xl font-semibold text-center text-black/60">
            Nova solicitação
          </Text>
        </View>
        <View className="w-11/12 mx-auto rounded-lg p-4 bg-black/10 border mt-5">
          {(credentials.exitID ||
            credentials.collectorPhone ||
            credentials.desc) && (
            <View>
              <Button title="Limpar dados" onPress={cleanTypedCredentials} />
            </View>
          )}
          <View className="my-4 ">
            <Text className="mb-4">ID de Saída </Text>

            <TextInput
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, exitID: Number(text) }))
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
            <Text className="mb-4">Telefone do coletor </Text>
            <TextInput
              keyboardType="numeric"
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
            <Text>Selecione uma data prevista de coleta</Text>
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
            <Button
              title="Selecionar"
              onPress={() => setIsVisible((prev) => !prev)}
            />
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
            <Text className="mb-4">Descrição: </Text>
            <TextInput
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, desc: text }))
              }
              multiline
              numberOfLines={10}
              placeholder="Digite alguma descrição aqui!"
              placeholderTextColor={"#999"}
              className="bg-neutral-50 h-52 w-full  rounded-md p-2"
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

          <TouchableOpacity onPress={handleSubmit}>
            <View className="rounded-lg flex-row justify-center items-center  h-14 bg-blue-500">
              <Text className="text-white text-lg mr-3">
                Solicitar Separação
              </Text>
              <FontAwesome color={"#fff"} name="plus" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreateRequestScreen;
