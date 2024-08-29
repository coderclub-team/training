import { usePostsQuery } from "@/store/api";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

export default function Page() {
  const [_page, setPage] = useState(1);
  const _per_page = 20; // Number of items per page
  let { data, error, isLoading, refetch } = usePostsQuery({
    _page,
    _per_page,
  });

  useEffect(() => {
    refetch();
  }, [_page]);

  const loadMore = () => {
    if (data && data.data.length < data.items) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isLoading && <Text>Loading...</Text>}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
        }
        data={data?.data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: 10,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            key={item.id?.toString()?.concat(item.title)}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
