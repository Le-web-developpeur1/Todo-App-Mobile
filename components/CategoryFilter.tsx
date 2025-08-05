import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = ["toutes", "urgente", "personnelle", "travail", "révision"];

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          style={[styles.btn, selected === cat && styles.active]}
        >
          <Text style={styles.text}>{cat === "toutes" ? "🔍 Toutes" : cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#e6e6e6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  active: {
    backgroundColor: "#4682B4",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
