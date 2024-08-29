import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NavbarWeb() {
  return (
    <View>
      <nav>
        <View className="flex flex-row gap-3 me-6">
          <Link className="text-white" href="/">
            Home
          </Link>
          <Link className="text-white" href="/about">
            About
          </Link>
          <Link className="text-white" href="/">
            Contact
          </Link>
        </View>
      </nav>
    </View>
  );
}
