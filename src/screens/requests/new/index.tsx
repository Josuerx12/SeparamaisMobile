import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { useRequests } from "../../../hooks/useRequests";
import { useFilterReq } from "../../../hooks/useFilterRequests";

const NewRequestScreen = () => {
  const { fetchUserRequests } = useRequests();

  const { data, isLoading } = useQuery(["userRequests"], fetchUserRequests);

  const { newReq } = useFilterReq(data);

  return <SafeAreaView></SafeAreaView>;
};

export default NewRequestScreen;
