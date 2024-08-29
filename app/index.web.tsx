import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MyGroupedBarChart = () => {
  const data = [
    { value: 20, label: "Jan", frontColor: "#177AD5" },
    { value: 40, label: "Feb", frontColor: "#177AD5" },
    { value: 75, label: "Mar", frontColor: "#177AD5" },
    { value: 20, label: "Apr", frontColor: "#177AD5" },
    { value: 50, label: "May", frontColor: "#177AD5" },
    { value: 60, label: "Jun", frontColor: "#177AD5" },
  ];

  const secondaryData = [
    { value: 15, frontColor: "#FF6B6B" },
    { value: 25, frontColor: "#FF6B6B" },
    { value: 50, frontColor: "#FF6B6B" },
    { value: 10, frontColor: "#FF6B6B" },
    { value: 30, frontColor: "#FF6B6B" },
    { value: 35, frontColor: "#FF6B6B" },
  ];

  // Manually combine data into a single array, positioning the bars closely
  const combinedData = data
    .map((item, index) => {
      const spacing = 15; // Adjust spacing between groups
      const barWidth = 12; // Width of individual bars
      return [
        { ...item, barWidth, spacing: index === 0 ? 0 : spacing }, // Primary data
        { ...secondaryData[index], barWidth }, // Secondary data
      ];
    })
    .flat();

  return (
    <View style={styles.container}>
      <Text className="text-white">Grouped Bar Chart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
  },
});

export default MyGroupedBarChart;
