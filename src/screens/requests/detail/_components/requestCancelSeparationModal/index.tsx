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

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  request: IRequest;
};

const RequestCancelSeparationModal = ({
  isOpen,
  handleClose,
  request,
}: Props) => {
  const query = useQueryClient();
  const [reason, setReason] = useState("");

  const toast = useToast();

  const { requestCancelReq } = useRequests();

  const { mutateAsync, isLoading } = useMutation(
    ["requestCancelRequest"],
    requestCancelReq,
    {
      onError: (e: any) => {
        toast.show("Error: " + e.reason.msg, {
          type: "danger",
        });
      },
      onSuccess: () =>
        Promise.all([
          toast.show(
            "Sucesso ao solicitar o cancelamento da sua solicitação!",
            {
              type: "success",
            }
          ),
          query.invalidateQueries("userRequests"),

          query.invalidateQueries(
            ("almoxRequests" + reqStatus.aguardandoCancelamento).trim()
          ),
          handleClose(),
        ]),
    }
  );

  return (
    <ModalConfirmations
      title="Solicitar Cancelamento de Separação"
      message={`Confirmar solicitação de cancelamento da separação da ID de saída nº: ${request.exitID}?`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <View>
        <Text className="text-lg font-bold text-center">
          Motivo do Cancelamento
        </Text>
        <TextInput
          onChangeText={(text) => setReason(text)}
          multiline
          placeholder="Digite o motivo do cancelamento aqui!"
          textAlignVertical="top"
          placeholderTextColor={"#333"}
          className="bg-white h-24 p-2 text-[#333] rounded-md mt-2"
        />
      </View>

      <View className="w-full flex-row">
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleClose}
          className="basis-[45%] flex-grow p-1 bg-red-500 mt-5 rounded mr-2"
        >
          <Text className="text-white text-center text-lg">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => await mutateAsync({ id: request._id, reason })}
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

export default RequestCancelSeparationModal;
