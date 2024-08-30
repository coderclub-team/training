import { useClaimsQuery } from "@/store/api";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Page() {
  const [page, setPage] = useState(1);

  const {
    data: claims,
    isLoading,
    isUninitialized,
    isFetching,
  } = useClaimsQuery({
    _page: page,
    _per_page: 10,
  });

  const loadMore = () => {
    if (
      !isLoading &&
      !isFetching &&
      claims?.pagination.totalCount !== claims?.data?.length
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View className="flex">
      <FlatList
        data={claims?.data}
        renderItem={({ item, index }) => (
          <View
            key={index?.toFixed()}
            style={{
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text>{item.purpose}</Text>

            <Text>{item.createdOn}</Text>
            <Pressable onPress={() => () => {}}>
              <View
                style={{
                  width: 70,
                  height: 50,
                }}
              >
                <Text>Delete</Text>
              </View>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        // onStartReachedThreshold={0.5}
        // onStartReached={() => setPage((page) => page - 1)}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View
            style={{
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isUninitialized && isFetching && <Text>Loading...</Text>}
          </View>
        }
      />
    </View>
  );
}
