import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useFilterRequests } from "../../../contexts/FilterContext";

const RequestsFilterModal = () => {
  const [isVisibleStartAt, setIsVisibleStartAt] = useState(
    Platform.OS === "ios" ? true : false
  );
  const [isVisibleEndAt, setIsVisibleEndAt] = useState(
    Platform.OS === "ios" ? true : false
  );

  const actualDate = new Date();

  const startAtDate = new Date(
    `${actualDate.getFullYear()}-${actualDate.getMonth() + 1}-01T00:00:00-03:00`
  );

  const { filterRequests, filters: FilterControl } = useFilterRequests();

  const [filters, setFilters] = useState(FilterControl);

  const navigator = useNavigation();

  function cleanFilters() {
    setFilters({
      endAt: actualDate,
      startAt: startAtDate,
      exitID: "",
    });
    filterRequests({
      endAt: actualDate,
      startAt: startAtDate,
      exitID: "",
    });
    navigator.goBack();
  }

  return (
    <KeyboardAwareScrollView className="flex flex-col">
      <View className="p-4">
        <View>
          {(filters.endAt != actualDate ||
            filters.startAt != startAtDate ||
            filters.exitID.length > 0) && (
            <TouchableOpacity
              onPress={cleanFilters}
              className="w-fit mx-auto mb-5"
            >
              <Text className="text-blue-600 text-lg">Limpar Filtros</Text>
            </TouchableOpacity>
          )}
          <View className="flex-col gap-2">
            <Text className="text-lg text-center font-semibold text-neutral-700 ">
              ID de Saída
            </Text>
            <TextInput
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, exitID: text }))
              }
              value={filters.exitID}
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor="#fff"
              className="bg-neutral-600 rounded-sm text-white px-4 h-[40px]"
              placeholder="Insira a id de saída que deseja filtrar!"
            />
          </View>
          <View className=" mt-4 items-center">
            <Text className="text-lg font-semibold text-neutral-700 ">
              Data de início
            </Text>
            {Platform.OS === "android" && (
              <View className="flex-col  w-full gap-y-2">
                <TouchableOpacity
                  className="w-full"
                  onPress={() => setIsVisibleStartAt((prev) => !prev)}
                >
                  <View className=" bg-neutral-600 w-full rounded-sm shadow mt-4 mx-auto p-2 ">
                    <Text className="text-center text-white">
                      Selecionar Data de Inicio
                    </Text>
                  </View>
                </TouchableOpacity>
                <TextInput
                  value={new Date(filters.startAt).toLocaleDateString("pt-BR")}
                  autoCorrect={false}
                  editable={false}
                  autoCapitalize="none"
                  placeholderTextColor="#fff"
                  className="bg-neutral-400 rounded-sm text-center text-white px-4 h-[40px]"
                  placeholder="Insira a id de saída que deseja filtrar!"
                />
              </View>
            )}
            {isVisibleStartAt && (
              <View className="mx-auto mt-4">
                <DatePicker
                  testID="dateTimePicker"
                  mode="date"
                  is24Hour
                  display="default"
                  onChange={(e, selectedDate?: Date) => {
                    setIsVisibleStartAt(Platform.OS === "ios");
                    if (selectedDate) {
                      setFilters((prev) => ({
                        ...prev,
                        startAt: selectedDate,
                      }));
                    }
                  }}
                  value={new Date(filters.startAt)}
                />
              </View>
            )}
          </View>

          <View className="w-full mt-4 items-center">
            <Text className="text-lg font-semibold text-neutral-700 ">
              Data de Fim
            </Text>
            {Platform.OS === "android" && (
              <View className="flex-col  w-full gap-y-2">
                <TouchableOpacity
                  className="w-full"
                  onPress={() => setIsVisibleEndAt((prev) => !prev)}
                >
                  <View className=" bg-neutral-600 w-full rounded-sm shadow mt-4 mx-auto p-2 ">
                    <Text className="text-center text-white">
                      Selecionar Data de Fim
                    </Text>
                  </View>
                </TouchableOpacity>
                <TextInput
                  value={new Date(filters.endAt).toLocaleDateString("pt-BR")}
                  autoCorrect={false}
                  editable={false}
                  autoCapitalize="none"
                  placeholderTextColor="#fff"
                  className="bg-neutral-400 rounded-sm text-center text-white px-4 h-[40px]"
                  placeholder="Insira a id de saída que deseja filtrar!"
                />
              </View>
            )}
            {isVisibleEndAt && (
              <View className="mx-auto mt-4">
                <DatePicker
                  testID="dateTimePicker"
                  mode="date"
                  is24Hour
                  display="default"
                  onChange={(e, selectedDate?: Date) => {
                    setIsVisibleEndAt(Platform.OS === "ios");
                    if (selectedDate) {
                      setFilters((prev) => ({
                        ...prev,
                        endAt: selectedDate,
                      }));
                    }
                  }}
                  value={new Date(filters.endAt)}
                />
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              filterRequests(filters);
              navigator.goBack();
            }}
            className="mt-6 w-fit"
          >
            <View className="w-full p-2 flex-row gap-x-2 justify-center items-center mx-auto rounded-sm bg-neutral-600">
              <FontAwesome color="#fff" size={18} name="filter" />
              <Text className="text-white text-lg">Filtrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RequestsFilterModal;
