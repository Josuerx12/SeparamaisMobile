import { View, Text, TextInput } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { IRequest } from "../../../interfaces/Request";
import { IBilling } from "../../../interfaces/Billing";

type RouteParams = {
  billing: IBilling;
};

const BillingDetails = () => {
  const { params } = useRoute();

  const { billing } = params as RouteParams;

  return (
    <View className="p-2">
      <Text className="text-center mb-3 mt-1 font-bold text-neutral-700 text-lg">
        ID de Compra: {billing.idDeCompra}
      </Text>

      <View className="flex-row gap-2 flex-wrap">
        <View className="basis-32 flex-grow items-center">
          <Text>Recebido por:</Text>
          <TextInput
            className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
            placeholderTextColor={"#000"}
            editable={false}
            defaultValue={billing.receptor.name?.split(" ")[0]}
          />
        </View>
        <View className="basis-32 flex-grow items-center">
          <Text>Contato:</Text>
          <TextInput
            className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
            placeholderTextColor={"#000"}
            editable={false}
            defaultValue={billing.receptor.phone}
          />
        </View>

        <View className="basis-32 flex-grow items-center">
          <Text>Solicitado Coleta em:</Text>
          <TextInput
            className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
            placeholderTextColor={"#000"}
            editable={false}
            defaultValue={new Date(billing.createdAt).toLocaleDateString(
              "pt-BR"
            )}
          />
        </View>

        <View className="basis-32 flex-grow items-center">
          <Text>Hora da Solicitação:</Text>
          <TextInput
            className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
            placeholderTextColor={"#000"}
            editable={false}
            defaultValue={new Date(billing.createdAt).toLocaleTimeString(
              "pt-BR"
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default BillingDetails;
