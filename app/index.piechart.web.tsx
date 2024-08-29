import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiay5hLm4uc2hhZmVlcUBnbWFpbC5jb20iLCJ1aWQiOiIwOTMwZWNiMC00ODAzLTQ5YzQtOWRlMi03NGU5ZmU3YjJkYWYiLCJHcmFkZUlEIjoiMiIsIkdyYWRlTmFtZSI6IiIsIkNvbXBhbnlJRCI6IjI2MCIsIkNvbWFwbnlOYW1lIjoiRkFTSElPTiBLSU5HRE9NIENPLiwgTFREICIsIkJyYW5kSUQiOiIwIiwiQnJhbmROYW1lIjoiIiwiU3RvcmVJRCI6IjAiLCJTdG9yZU5hbWUiOiIiLCJQcm9kQ2F0SUQiOiIwIiwiUHJvZENhdE5hbWUiOiIiLCJDb3N0Q2VudHJlSWQiOiIwIiwiQ29zdENlbnRyZU5hbWUiOiIiLCJDb3VudHJ5Q29kZSI6Ik1ZIiwiQ291bnRyeU5hbWUiOiJNYWxheXNpYSIsIkN1cnJlbmN5Q29kZSI6Ik1ZUiIsIkRlcGFydG1lbnRJRCI6IjIiLCJHbXRPZmZzZXQiOiIyODgwMCIsIkltYWdlVXJsIjoiIiwiRGVzaWduYXRpb24iOiJJVCBBZG1pbiIsImlwIjoiMTUyLjU4LjIyMS4xOSIsInJvbGVzIjoiQWRtaW4iLCJuYmYiOjE3MjM3ODk5NjQsImV4cCI6MTcyMzgxODc2NCwiaXNzIjoiQ2xhaW1zLkFzc2lzdDM2MC5BcGkiLCJhdWQiOiJDbGFpbXMuQXNzaXN0MzYwLkFwaS5Vc2VyIn0.YjbYrtbfjM3i29YQz0H7wjBaIEr9AYe2PzyluAIMwQNRrPVunJQ3eaezse4lpkxy5yXP7SIkNXeB2x8EqdPEag";
type DataItem = { id: number; value: number; color?: string; text?: string };
type DataItem2 = {
  status: number;
  totalCount: number;
  color?: string;
  text?: string;
};

export default function index() {
  const { data: claims } = useFetchClamsQuery();
  let pieChartData =
    claims?.claimdata.map?.((item) => ({
      id: item.status,
      value: item.totalCount,
      color: item?.status === 1 ? "red" : item?.status === 2 ? "green" : "blue",
    })) ?? [];
  const totalValue = pieChartData.reduce((acc, item) => acc + item.value, 0);

  const mergedData = Object.values(
    pieChartData.reduce(
      (acc: Record<number, DataItem>, { id, value, color }) => {
        if (!acc[id]) {
          acc[id] = { id, value: 0 };
        }
        acc[id].value += value;
        acc[id].color = color;
        acc[id].text = `${((acc[id].value / totalValue) * 100).toFixed(2)}%`;

        return acc;
      },
      {}
    )
  );

  // let newData = mergedData?.map((i) => ({
  //   ...i,
  //   value: `${((i.value / totalValue) * 100).toFixed(2)}%`,
  // }));
  return (
    <View className="min-w-full min-h-full justify-center items-center">
      <PieChart
        showExternalLabels
        showText
        radius={100}
        textBackgroundColor="white"
        textBackgroundRadius={10}
        showValuesAsLabels
        labelLineConfig={{
          color: "orange",
        }}
        textSize={6}
        showTextBackground
        data={mergedData ?? []}
      />
      <Text>{JSON.stringify(pieChartData)}</Text>
      <Text className="text-primary ">{JSON.stringify(mergedData)}</Text>
    </View>
  );
}
function useFetchClamsQuery(): { data: any } {
  throw new Error("Function not implemented.");
}
