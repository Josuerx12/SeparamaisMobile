import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  title: string;
  message: string;
  children: ReactNode;
  isOpen: Boolean;
  handleClose: () => void;
};

const ModalConfirmations = ({
  title,
  message,
  children,
  isOpen,
  handleClose,
}: Props) => {
  return (
    <View
      className={`w-full h-full bg-black/80 z-50 ${
        isOpen ? "absolute inset-0" : "hidden"
      }`}
    >
      <View className="w-11/12 h-fit p-2 mt-5 rounded-md mx-auto bg-neutral-300">
        <View className="justify-between items-center flex-row border-b-2 border-neutral-100 pb-2">
          <Text className="text-xl font-bold text-neutral-900 capitalize">
            {title}
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <FontAwesome size={24} name="times" color={"rgb(23 23 23)"} />
          </TouchableOpacity>
        </View>

        <View>
          <View className="mx-auto">
            <FontAwesome name="check-circle" size={200} color={"#21b128"} />
          </View>
          <Text className="text-justify">{message}</Text>

          {children}
        </View>
      </View>
    </View>
  );
};

export default ModalConfirmations;
