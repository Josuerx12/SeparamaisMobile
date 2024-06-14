import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ModalConfirmations from "../../../../../components/modals/confirmations";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const StartSeparationModal = ({ isOpen, handleClose }: Props) => {
  return (
    <ModalConfirmations
      title="Inicio Separação"
      message="Confirmar inicio da separação de materiais?"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <View className="w-full flex-row">
        <TouchableOpacity
          onPress={handleClose}
          className="basis-[45%] flex-grow p-1 bg-red-500 mt-5 rounded mr-2"
        >
          <Text className="text-white text-center text-lg">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="basis-[45%] flex-grow p-1 bg-green-500 mt-5 rounded">
          <Text className="text-white text-center text-lg">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ModalConfirmations>
  );
};

export default StartSeparationModal;
