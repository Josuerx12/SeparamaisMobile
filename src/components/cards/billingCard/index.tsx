import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IBilling } from "../../../interfaces/Billing";
import { BillingStatus } from "../../../data/billingStatus";

const BillingCard = ({ billing }: { billing: IBilling }) => {
  const { navigate } = useNavigation();

  return (
    <View
      key={billing.id}
      className="w-11/12 mb-5 mx-auto rounded-md bg-black/10 p-2"
    >
      <Text className="capitalize text-center text-blue-500 font-bold text-lg">
        {BillingStatus[billing.state]}
      </Text>

      <View className="flex flex-col gap-y-3 mt-1">
        <Text className="font-bold">
          ID de Compra:{" "}
          <Text className="font-normal">{billing.idDeCompra}</Text>
        </Text>

        <Text className="font-bold line-clamp-3">
          Descrição: <Text className="font-normal">{billing.message}</Text>
        </Text>
        <Text className="font-bold line-clamp-3">
          Recebido por:{" "}
          <Text className="font-normal line-clamp-1">
            {billing.receptor.name}
          </Text>
        </Text>

        <Text className="font-bold text-black/60 text-xs">
          Chegou:{" "}
          <Text className="font-normal">
            {new Date(billing.createdAt).toLocaleString("pt-BR")}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        // onPress={() => navigate("requestDetails", { request: req })}
        className="bg-blue-500 w-[140px] mx-auto py-1 mt-4 rounded-md"
      >
        <Text className="text-center text-lg text-white">Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BillingCard;
