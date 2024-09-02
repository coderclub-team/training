import AppUtil from "@/AppUtil";
import { useClaimsQuery, useDeleteClaimMutation } from "@/store/api";
import { IPaginationQuery } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Page() {
  const [queryParams, setQueryPrams] = useState<IPaginationQuery>({
    _page: 1,
    _per_page: 20,
  });
  const [deleteClaimById, { data, isSuccess, isError, error }] =
    useDeleteClaimMutation();

  const {
    data: claims,
    isLoading,
    isUninitialized,
    isFetching,
  } = useClaimsQuery(queryParams);

  const loadMore = () => {
    if (
      !isLoading &&
      !isFetching &&
      claims?.pagination.totalCount !== claims?.data?.length
    ) {
      setQueryPrams((params) => ({ ...params, _page: params._page + 1 }));
    }
  };
  const deleteClaim = (id: number) => deleteClaimById(id);
  useEffect(() => {
    if (isSuccess) Alert.alert("Deleted");
    if (isError) Alert.alert("Error");
    // console.log(error);
  }, [isSuccess, isError, error]);

  const handletextChange = AppUtil.debounce((text: string) => {
    setQueryPrams((params) => ({
      ...params,
      _page: 1,
      _searchTerm: text || undefined,
    }));
  }, 1000);
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setQueryPrams((params) => ({
      ...params,
      _page: 1,

      _startDate: selectedDate?.toString(),
    }));
  };
  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setQueryPrams((params) => ({
      ...params,
      _page: 1,

      _endDate: selectedDate?.toString(),
    }));
  };

  return (
    <View
      className="flex"
      style={{
        marginBottom: 170,
      }}
    >
      <Text
        style={{
          fontSize: 48,
          fontWeight: 900,
        }}
      >
        {claims?.data.length} / {claims?.pagination.totalCount}
      </Text>
      <View>
        <TextInput
          onChangeText={handletextChange}
          style={{
            width: 200,
            height: 50,
            borderWidth: 1,
            borderColor: "black",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          marginHorizontal: 10,
        }}
      >
        <Text>Start Date</Text>
        <Text>End Date</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <DateTimePicker
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            handleStartDateChange(event, selectedDate);
          }}
          value={
            queryParams._startDate
              ? new Date(queryParams._startDate)
              : new Date()
          }
        />
        <DateTimePicker
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            handleEndDateChange(event, selectedDate);
          }}
          value={
            queryParams._endDate ? new Date(queryParams._endDate) : new Date()
          }
        />
      </View>
      <FlatList
        data={claims?.data}
        renderItem={({ item, index }) => (
          <View
            key={index?.toFixed()}
            style={{
              backgroundColor: item.status === 1 ? "orange" : "lightgrey",
              padding: 10,
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {item.id}
            </Text>
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text>{item.purpose}</Text>

            <Text>{item.createdOn}</Text>
            <Pressable onPress={() => deleteClaim(item.id)}>
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
        onEndReachedThreshold={1}
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
