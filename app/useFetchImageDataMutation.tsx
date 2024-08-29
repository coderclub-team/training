import { useResetPasswordMutation } from "@/store/api";
import React from "react";
import { View } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import BlobImage from "./BlobImage";
export default function index() {
  useDeviceContext(tw);
  let [_, { isError, isSuccess, isUninitialized, data, isLoading, error }] =
    useResetPasswordMutation();
  return (
    <View style={tw`min-h-full`}>
      <BlobImage />
    </View>
  );
}
