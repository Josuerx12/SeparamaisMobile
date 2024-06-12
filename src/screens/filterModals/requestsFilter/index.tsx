import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";

const RequestsFilterModal = () => {
  const [isVisible, setIsVisible] = useState(
    Platform.OS === "ios" ? true : false
  );

  const [filters, setFilters] = useState({
    exitID: "",
    startAt: new Date(),
    endAt: new Date(),
  });

  return (
    <View className="p-4">
      <View>
        <View className="flex-col gap-2">
          <Text className="pl-4 text-xl font-semibold text-neutral-700 ">
            ID de Saída
          </Text>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="#fff"
            className="bg-blue-500 rounded-md text-white px-4 h-[40px]"
            placeholder="Insira a id de saída que deseja filtrar!"
          />
        </View>
        <View className="flex-col gap-2">
          <Text className="pl-4 text-xl font-semibold text-neutral-700 ">
            Data de início
          </Text>
          {Platform.OS === "android" && (
            <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
              <View className="bg-neutral-500 rounded-md text-white px-4 h-[40px]">
                <Text className="text-center text-white">
                  Selecionar Data de Inicio
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {isVisible && (
            <View className="mx-auto mt-4">
              <DatePicker
                testID="dateTimePicker"
                mode="date"
                is24Hour
                display="default"
                style={{}}
                onChange={(e, selectedDate?: Date) => {
                  setIsVisible(Platform.OS === "ios");
                  if (selectedDate) {
                    setFilters((prev) => ({
                      ...prev,
                      startAt: selectedDate,
                    }));
                  }
                }}
                value={filters.startAt}
              />
            </View>
          )}
        </View>

        <View className="flex-col gap-2">
          <Text className="pl-4 text-xl font-semibold text-neutral-700 ">
            Data de Fim
          </Text>
          {Platform.OS === "android" && (
            <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
              <View className="bg-neutral-500  rounded-full  shadow mt-4 mx-auto p-2">
                <Text className="text-center text-white">
                  Selecionar Data de Fim
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {isVisible && (
            <View className="mx-auto mt-4">
              <DatePicker
                testID="dateTimePicker"
                mode="date"
                is24Hour
                display="default"
                onChange={(e, selectedDate?: Date) => {
                  setIsVisible(Platform.OS === "ios");
                  if (selectedDate) {
                    setFilters((prev) => ({
                      ...prev,
                      endAt: selectedDate,
                    }));
                  }
                }}
                value={filters.startAt}
              />
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Text>Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestsFilterModal;
