import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Todo App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2F4F4F",
  },
});
