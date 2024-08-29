import { useFetchImageDataMutation } from "@/store/api";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function BlobImage() {
  let [getBase64, { data }] = useFetchImageDataMutation();
  useEffect(() => {
    getBase64("users%2F7267ee5a-5f96-49e6-b290-2b4f6c054706.jpeg");
  }, []);
  return (
    <View>
      {data && (
        <Image
          source={{
            uri: data,
          }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <Text>Image</Text>
      <Text>BlobImage</Text>
    </View>
  );
}
