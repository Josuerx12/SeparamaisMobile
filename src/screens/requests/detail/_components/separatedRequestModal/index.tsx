import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import ModalConfirmations from "../../../../../components/modals/confirmations";
import { IRequest } from "../../../../../interfaces/Request";
import { useRequests } from "../../../../../hooks/useRequests";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "react-native-toast-notifications";
import { reqStatus } from "../../../../../constants/requestsStatus";
import { useNavigation } from "@react-navigation/native";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  request: IRequest;
};

const SeparatedRequestModal = ({ isOpen, handleClose, request }: Props) => {
  const { awaitingCollection } = useRequests();
  const { navigate } = useNavigation();
  const toast = useToast();
  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["separatedRequest"],
    awaitingCollection,
    {
      onSuccess: () => {
        Promise.all([
          toast.show("Separação finzalizada com sucesso!", { type: "success" }),
          query.invalidateQueries("userRequests"),
          query.invalidateQueries(
            "almoxRequests" + reqStatus.aguardandoColeta.trim()
          ),
          query.invalidateQueries(
            ("almoxRequests" + reqStatus.emSeparacao).trim()
          ),
          handleClose(),
          navigate("waitingForCollectRequests"),
        ]);
      },
      onError: (e) => {
        toast.show("Error" + e, { type: "danger" });
      },
    }
  );

  return (
    <ModalConfirmations
      title="Finalizar Separação"
      message={`Confirmar finalização da separação de materiais da ID de saída nº: ${request.exitID}?`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <View className="w-full flex-row">
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleClose}
          className="basis-[45%] flex-grow p-1 disabled:bg-red-400 bg-red-500 mt-5 rounded mr-2"
        >
          <Text className="text-white text-center text-lg">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => await mutateAsync(request._id)}
          disabled={isLoading}
          className="basis-[45%] flex-grow p-1 bg-green-500 disabled:bg-green-400 mt-5 rounded"
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

export default SeparatedRequestModal;
