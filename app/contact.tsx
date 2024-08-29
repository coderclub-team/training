import { useFetchTodosQuery } from "@/store/api";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
  const { data: todos } = useFetchTodosQuery();
  return (
    <View>
      <Text>about</Text>
    </View>
  );
}
