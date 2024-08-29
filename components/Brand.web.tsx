import React from "react";
import { Image, Text, View } from "react-native";

export default function BrandWeb() {
  return (
    <View className="flex flex-row items-center">
      <Image
        style={{
          width: 48,
          height: 48,
        }}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text className="ms-2 text-white text-2xl font-PlayfairDisplay">
        The Little Flower Higher Secondary School
      </Text>
    </View>
  );
}
