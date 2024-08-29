import React from "react";
import { ColorValue, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

// let status = [
//   {
//     id: 1,
//     name: "Draft",
//   },

//   {
//     id: 2,
//     name: "Rejected",
//   },
//   {
//     id: 3,
//     name: "Submitted",
//   },
//   {
//     id: 4,
//     name: "Approved",
//   },
// ];

// let getColorByStatus = (statusId: number) => {
//   let statusColors: Record<number, string> = {
//     1: "#177AD5",
//     2: "#ED6665",
//     3: "#FFA94D",
//     4: "#00B74A",
//   };
//   return statusColors[statusId];
// };

const data = [
  {
    status: 1,
    statusName: "Draft",
    currencyCode: "MYR",
    currencyName: "Malaysian ringgit",
    totalAmount: 1864.83,
    totalCount: 18,
    totalClaimableAmount: 1664.83,
    expensesCount: 3,
    mileagesCount: 1,
    advancesCount: 0,
    perDiemsCount: 1,
    expensesAmount: 1454,
    mileagesAmount: 200,
    advancesAmount: 0,
    perDiemsAmount: 210.83,
  },
  {
    status: 4,
    statusName: "Approved",
    currencyCode: "MYR",
    currencyName: "Malaysian ringgit",
    totalAmount: 76891245,
    totalCount: 3,
    totalClaimableAmount: 76891245,
    expensesCount: 4,
    mileagesCount: 1,
    advancesCount: 1,
    perDiemsCount: 5,
    expensesAmount: 76890765,
    mileagesAmount: 260,
    advancesAmount: 200,
    perDiemsAmount: 420,
  },
];

const statusMapping: { [key: string]: string } = {
  1: "Draft",
  2: "Rejected",
  3: "Submitted",
  4: "Approved",
  // Add other status mappings if needed
};

const groupedData: Record<
  string,
  {
    value: number;
    label: string;
    spacing: number;
    labelWidth: number;
    labelTextStyle: { color: ColorValue };
    frontColor: ColorValue;
  }[]
> = {
  Expenses: [],
  Mileage: [],
  Advances: [],
  PerDiem: [],
};
data.forEach((item) => {
  groupedData.Expenses.push({
    value: item.expensesAmount,
    label: "Expenses",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "orange",
  });
  groupedData.Mileage.push({
    value: item.mileagesAmount,
    label: "Mileages",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "orange",
  });
  groupedData.Advances.push({
    value: item.advancesAmount,
    label: "Advances",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#177AD5",
  });
  groupedData.PerDiem.push({
    value: item.perDiemsAmount,
    label: "Per Diem",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: "#177AD5",
  });
});
function emptyLabel(arg: any) {
  return arg?.map((item: any, i: number) => {
    return { ...item, label: i !== 0 ? item.label : "" };
  });
}
const barData = [
  ...groupedData.Expense,
  ...groupedData.Mileage,
  ...groupedData.Advance,
  ...groupedData.PerDiem,
];

const GroupedBars = () => {
  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Chart title goes here
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 24,
            backgroundColor: "yellow",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#177AD5",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: "lightgray",
              }}
            >
              Point 01
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#ED6665",
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: "lightgray",
              }}
            >
              Point 02
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#333340",
        paddingBottom: 40,
        borderRadius: 10,
      }}
    >
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={32}
        xAxisType="grouped"
        spacing={32}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "#FFFFFF" }}
        xAxisColor={"#FFFFFF"}
        noOfSections={3}
        maxValue={100000}
      />
    </View>
  );
};

export default GroupedBars;
