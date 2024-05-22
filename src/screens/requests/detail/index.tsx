import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { IRequest } from "../../../interfaces/Request";

type RouteParams = {
  request: IRequest;
};

const RequestDetails = () => {
  const { params } = useRoute();

  const { request } = params as RouteParams;

  return (
    <View>
      <Text>ID Da Solicitação: {request._id}</Text>
    </View>
  );
};

export default RequestDetails;
