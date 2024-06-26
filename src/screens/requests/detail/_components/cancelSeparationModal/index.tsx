import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import ModalConfirmations from "../../../../../components/modals/confirmations";
import { IRequest } from "../../../../../interfaces/Request";
import { useMutation, useQueryClient } from "react-query";
import { useRequests } from "../../../../../hooks/useRequests";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { reqStatus } from "../../../../../constants/requestsStatus";
import { useNavigation } from "@react-navigation/native";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  request: IRequest;
};

const CancelSeparationModal = ({ isOpen, handleClose, request }: Props) => {
  const query = useQueryClient();
  const { navigate } = useNavigation();
  const toast = useToast();

  const { cancelReq } = useRequests();

  const { mutateAsync, isLoading } = useMutation(["cancelRequest"], cancelReq, {
    onError: (e: any) => {
      toast.show("Error: " + e.reason.msg, {
        type: "danger",
      });
    },
    onSuccess: () =>
      Promise.all([
        toast.show("Sucesso ao solicitar o cancelamento da sua solicitação!", {
          type: "success",
        }),
        query.invalidateQueries("almoxRequests" + reqStatus.cancelada.trim()),
        handleClose(),
        navigate("cancelledRequestsAlmox"),
      ]),
  });

  return (
    <ModalConfirmations
      title="Cancelar Separação"
      message={`Confirmar o cancelamento da separação da ID de saída nº: ${request.exitID}?`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <View className="w-full flex-row">
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleClose}
          className="basis-[45%] flex-grow p-1 bg-red-500 mt-5 rounded mr-2"
        >
          <Text className="text-white text-center text-lg">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => await mutateAsync(request._id)}
          disabled={isLoading}
          className="basis-[45%] flex-grow p-1 bg-green-500 mt-5 rounded"
        >
          {isLoading ? (
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-center text-lg">
                Confirmando
              </Text>
              <ActivityIndicator size={"small"} />
            </View>
          ) : (
            <Text className="text-white text-center text-lg">Confirmar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ModalConfirmations>
  );
};

export default CancelSeparationModal;
