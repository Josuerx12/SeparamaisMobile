import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-modal-datetime-picker";

const CreateRequestScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const { navigate } = useNavigation();

  return (
    <KeyboardAwareScrollView className="flex flex-col gap-y-5">
      <SafeAreaView className="">
        <View>
          <Text className="text-2xl font-semibold text-center text-black/60">
            Nova solicitação
          </Text>
        </View>
        <View className="w-11/12 mx-auto rounded-lg p-4 bg-black/10 border mt-5">
          <View className="my-4 ">
            <Text className="mb-4">ID de Saída: </Text>
            <TextInput
              placeholder="Digite a ID de saída para separação!"
              placeholderTextColor={"#999"}
              className="bg-neutral-50 h-10 w-full  rounded-md p-2"
            />
          </View>
          <View className="my-4 ">
            <Text className="mb-4">Telefone do coletor: </Text>
            <TextInput
              placeholder="22990079533"
              placeholderTextColor={"#999"}
              className="bg-neutral-50 h-10 w-full  rounded-md p-2"
            />
          </View>
          <View className="w-full justify-center items-center">
            <Text className="font-bold ">
              Selecione uma data prevista de coleta:
            </Text>
            <Text className="font-semibold my-2">
              Data prevista:
              <Text className="font-normal">
                {date.toLocaleDateString("pt-BR")}
              </Text>
            </Text>
            <Button
              title="Selecionar"
              onPress={() => setIsVisible((prev) => !prev)}
            />
            <DateTimePicker
              date={date}
              isVisible={isVisible}
              onCancel={() => setIsVisible((prev) => !prev)}
              onConfirm={(date) => {
                setDate(date);
                setIsVisible(false);
              }}
            />
          </View>

          <View className="my-4">
            <Text className="mb-4">Descrição: </Text>
            <TextInput
              multiline
              numberOfLines={10}
              placeholder="Digite alguma descrição aqui!"
              placeholderTextColor={"#999"}
              className="bg-neutral-50 h-52 w-full  rounded-md p-2"
            />
          </View>

          <TouchableOpacity>
            <View className="flex-row justify-center items-center gap-x-2">
              <Text>Solicitar Separação</Text>
              <FontAwesome name="plus" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CreateRequestScreen;
