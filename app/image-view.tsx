import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import ImageView from "react-native-image-viewing";

const images = [
  {
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  },
  {
    uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
  },
];

export default function Page() {
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable
        onPress={() => {
          setIsVisible(() => {
            setIndex(0);
            return true;
          });
        }}
      >
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{ uri: images[1].uri }}
        />
      </Pressable>
      <ImageView
        images={images}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}
