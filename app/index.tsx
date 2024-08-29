import { useClaimsQuery } from "@/store/api";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Page() {
  let [page, setPage] = useState(1);
  // let perPage = 20;
  let {
    data: claims,
    refetch,
    isLoading,
    isUninitialized,
    isFetching,
  } = useClaimsQuery({
    _page: page,
    _per_page: 20,
  });
  let loadMore = () => {
    if (claims && claims.data.length < claims.pagination.totalCount) {
      // Load more data
      setPage((prevPage) => prevPage + 1);
      refetch();
    }
    // Load more data
  };
  return (
    <View className="flex">
      <FlatList
        data={claims?.data}
        renderItem={({ item, index }) => (
          <View
            key={item.id?.toString()?.concat(index.toString())}
            style={{
              backgroundColor: "lightgrey",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>{item.id}</Text>
            <Text>{item.createdByUser}</Text>
            <Text>{item.createdOn}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
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
