import React from "react";
import {Text} from "react-native";

export const Header = () => {
  return (
    <Text
      style={{
        fontSize: 26,
        fontWeight: "bold",
        paddingLeft: 15,
        borderBottomWidth: 1,
      }}
    >
      Распределение бюджета
    </Text>
  );
};
