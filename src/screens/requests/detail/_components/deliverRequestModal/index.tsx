import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import ModalConfirmations from "../../../../../components/modals/confirmations";
import { IRequest } from "../../../../../interfaces/Request";
import { useRequests } from "../../../../../hooks/useRequests";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "react-native-toast-notifications";
import { reqStatus } from "../../../../../constants/requestsStatus";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  request: IRequest;
};

type MutationErrors = {
  name: {
    msg: string;
  };
  document: {
    msg: string;
  };
};

const DeliveryRequestModal = ({ isOpen, handleClose, request }: Props) => {
  const { collected } = useRequests();
  const { navigate } = useNavigation();
  const toast = useToast();
  const query = useQueryClient();

  const [credentials, setCredentials] = useState({
    name: "",
    document: "",
  });

  const { mutateAsync, isLoading, error } = useMutation<
    any,
    MutationErrors,
    { id: string; collectorCredentials: { name: string; document: string } }
  >(["startSeparation"], collected, {
    onSuccess: () => {
      Promise.all([
        toast.show("Separação iniciada com sucesso!", { type: "success" }),
        query.invalidateQueries("userRequests"),
        query.invalidateQueries("almoxRequests" + reqStatus.coletado.trim()),
        query.invalidateQueries(
          ("almoxRequests" + reqStatus.aguardandoColeta).trim()
        ),
        handleClose(),
        navigate("collectedRequestsAlmox"),
      ]);
    },
    onError: (e) => {
      toast.show("Error" + e, { type: "danger" });
    },
  });

  return (
    <ModalConfirmations
      title="Finalizar Separação"
      message={`Confirmar entrega do material separado da ID de saída nº: ${request.exitID}?`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <View className="flex-col gap-y-4">
        <View className="flex-col gap-y-2">
          <Text className="text-neutral-800 font-bold">Nome do Coletor</Text>
          <TextInput
            onChangeText={(text) =>
              setCredentials((prev) => ({ ...prev, name: text }))
            }
            textAlignVertical="top"
            placeholderTextColor={"#333"}
            className="bg-neutral-300 p-2 text-[#333] rounded-md mt-2"
            placeholder="Nome do coletor.."
          />
          {error?.name && (
            <Text className="bg-red-900 rounded-md text-white p-2 text-justify">
              {error.name.msg}
            </Text>
          )}
        </View>
        <View className="flex-col gap-y-2">
          <Text className="text-neutral-800 font-bold">
            Documento do Coletor
          </Text>
          <TextInput
            textAlignVertical="top"
            onChangeText={(text) =>
              setCredentials((prev) => ({ ...prev, document: text }))
            }
            placeholderTextColor={"#333"}
            className="bg-neutral-300 p-2 text-[#333] rounded-md mt-2"
            placeholder="Documento do coletor.."
          />
          {error?.document && (
            <Text className="bg-red-900 rounded-md text-white p-2 text-justify">
              {error.document.msg}
            </Text>
          )}
        </View>
      </View>

      <View className="w-full flex-row">
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleClose}
          className="basis-[45%] flex-grow p-1 disabled:bg-red-400 bg-red-500 mt-5 rounded mr-2"
        >
          <Text className="text-white text-center text-lg">Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () =>
            await mutateAsync({
              id: request._id,
              collectorCredentials: credentials,
            })
          }
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

export default DeliveryRequestModal;
