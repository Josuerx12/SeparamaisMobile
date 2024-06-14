import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  title: string;
  children: ReactNode;
  isOpen: Boolean;
};

const Modal = ({ title, children, isOpen }: Props) => {
  return (
    <View className="w-10/12 bg-black/60">
      <View className="p-2 justify-between flex-row ">
        <Text>{title}</Text>
        <TouchableOpacity>
          <FontAwesome name="times" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;
