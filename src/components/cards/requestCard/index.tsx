import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { IRequest } from "../../../interfaces/Request";
import { useNavigation } from "@react-navigation/native";

const RequestCard = ({ req }: { req: IRequest }) => {
  const { navigate } = useNavigation();
  return (
    <View
      key={req._id}
      className="w-11/12 mb-5 mx-auto rounded-md bg-black/10 p-2"
    >
      <Text className="capitalize text-center text-blue-500 font-bold text-lg">
        {req.status}
      </Text>

      <View className="flex flex-col gap-y-3 mt-1">
        <Text className="font-bold">
          ID de Saída: <Text className="font-normal">{req.exitID}</Text>
        </Text>
        {req.collectedAt ? (
          <Text className="font-bold">
            Coleta realizada:{" "}
            <Text className="font-normal">
              {new Date(req.collectedAt).toLocaleString("pt-BR")}
            </Text>
          </Text>
        ) : (
          <Text className="font-bold">
            Previsão de Coleta:{" "}
            <Text className="font-normal">
              {new Date(req.collectForecast).toLocaleDateString("pt-BR")}
            </Text>
          </Text>
        )}
        <Text className="font-bold">
          Descrição: <Text className="font-normal">{req.desc}</Text>
        </Text>

        <Text className="font-bold text-black/60 text-xs">
          Data de Solicitação:{" "}
          <Text className="font-normal">
            {new Date(req.createdAt).toLocaleString("pt-BR")}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigate("requestDetails", { request: req })}
        className="bg-blue-500 w-[140px] mx-auto py-1 mt-4 rounded-md"
      >
        <Text className="text-center text-lg text-white">Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestCard;
