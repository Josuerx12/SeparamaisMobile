import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { IRequest } from "../../../interfaces/Request";
import ModalConfirmations from "../../../components/modals/confirmations";
import { reqStatus } from "../../../constants/requestsStatus";
import { useAuth } from "../../../contexts/AuthContext";
import StartSeparationModal from "./_components/startSeparationModal";

type RouteParams = {
  request: IRequest;
};

const RequestDetails = () => {
  const { params } = useRoute();
  const { user } = useAuth();

  const [isOpenSeparateModal, setIsOpenSeparateModal] = useState(false);

  const { request } = params as RouteParams;

  return (
    <>
      <StartSeparationModal
        isOpen={isOpenSeparateModal}
        handleClose={() => setIsOpenSeparateModal((prev) => !prev)}
      />
      <View className="p-2">
        <Text className="text-center mb-3 mt-1 font-bold text-neutral-700 text-lg">
          ID de Saída: {request.exitID}
        </Text>

        <View className="flex-row gap-2 flex-wrap">
          <View className="basis-32 flex-grow items-center">
            <Text>Solicitante:</Text>
            <TextInput
              className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
              placeholderTextColor={"#000"}
              editable={false}
              defaultValue={request.requestedBy.name?.split(" ")[0]}
            />
          </View>
          <View className="basis-32 flex-grow items-center">
            <Text>Contato:</Text>
            <TextInput
              className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
              placeholderTextColor={"#000"}
              editable={false}
              defaultValue={request.requestedBy.phone}
            />
          </View>

          <View className="basis-32 flex-grow items-center">
            <Text>Solicitado em:</Text>
            <TextInput
              className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
              placeholderTextColor={"#000"}
              editable={false}
              defaultValue={new Date(request.createdAt).toLocaleDateString(
                "pt-BR"
              )}
            />
          </View>

          <View className="basis-32 flex-grow items-center">
            <Text>Hora da Solicitação:</Text>
            <TextInput
              className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
              placeholderTextColor={"#000"}
              editable={false}
              defaultValue={new Date(request.createdAt).toLocaleTimeString(
                "pt-BR"
              )}
            />
          </View>
        </View>

        {request?.separetedBy && request.separetedAt && (
          <View>
            <Text className="text-lg my-3 text-bold text-neutral-700 text-center font-bold">
              Detalhes da Separação
            </Text>

            <View className="flex-row gap-2 flex-wrap">
              <View className="basis-32 flex-grow items-center">
                <Text>Separado por:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={request.separetedBy.name?.split(" ")[0]}
                />
              </View>
              <View className="basis-32 flex-grow items-center">
                <Text>Contato:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={request.separetedBy.phone}
                />
              </View>

              <View className="basis-32 flex-grow items-center">
                <Text>Solicitado em:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={new Date(
                    request.separetedAt
                  ).toLocaleDateString("pt-BR")}
                />
              </View>

              <View className="basis-32 flex-grow items-center">
                <Text>Hora da Solicitação:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={new Date(
                    request.separetedAt
                  ).toLocaleTimeString("pt-BR")}
                />
              </View>
            </View>
          </View>
        )}

        {request?.collectedBy && request.collectedAt && (
          <View>
            <Text className="text-lg text-bold my-3 text-neutral-700 text-center font-bold">
              Detalhes da Coleta
            </Text>

            <View className="flex-row gap-2 flex-wrap">
              <View className="basis-32 flex-grow items-center">
                <Text>Coletado por:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={request.collectedBy.name}
                />
              </View>
              <View className="basis-32 flex-grow items-center">
                <Text>Documento:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={request.collectedBy.document}
                />
              </View>

              <View className="basis-32 flex-grow items-center">
                <Text>Coletado em:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={new Date(
                    request.collectedAt
                  ).toLocaleDateString("pt-BR")}
                />
              </View>

              <View className="basis-32 flex-grow items-center">
                <Text>Hora da coleta:</Text>
                <TextInput
                  className="bg-neutral-300 text-black py-1 mt-1 w-full  text-center rounded"
                  placeholderTextColor={"#000"}
                  editable={false}
                  defaultValue={new Date(
                    request.collectedAt
                  ).toLocaleTimeString("pt-BR")}
                />
              </View>
            </View>
          </View>
        )}

        {request.status === reqStatus.nova && user?.almox && (
          <TouchableOpacity
            onPress={() => setIsOpenSeparateModal((prev) => !prev)}
            className="p-1 bg-blue-500 mt-5 rounded w-full  mx-auto"
          >
            <Text className="text-white text-center text-lg">
              Iniciar Separação
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default RequestDetails;
