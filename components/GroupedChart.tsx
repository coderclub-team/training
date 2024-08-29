import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const GroupedBarChartExample = () => {
  const data = [
    {
      value: 250,
      label: "Jan",
      frontColor: "#177AD5",
    },
    {
      value: 300,
      label: "Feb",
      frontColor: "#177AD5",
    },
    {
      value: 200,
      label: "Mar",
      frontColor: "#177AD5",
    },
  ];

  const data2 = [
    {
      value: 150,
      label: "Jan",
      frontColor: "#79D2DE",
    },
    {
      value: 200,
      label: "Feb",
      frontColor: "#79D2DE",
    },
    {
      value: 170,
      label: "Mar",
      frontColor: "#79D2DE",
    },
  ];

  return (
    <View>
      <BarChart
        data={data}
        stackData={[{ stacks: data2 }]}
        // stackData={data2}
        barWidth={20}
        noOfSections={3}
        barBorderRadius={4}
        spacing={10}
        isThreeD
      />
    </View>
  );
};

export default GroupedBarChartExample;
