import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="text-gray-700 text-lg font-semibold mt-4">
        Carregando...
      </Text>
    </View>
  );
};

export default LoadingScreen;
