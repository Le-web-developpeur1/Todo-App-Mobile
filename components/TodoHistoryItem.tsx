import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Todo } from "@/app/(tabs)/index"; 

interface TodoHistoryItemProps {
  item: Todo;
  restoreTodo: (id: string) => void;
}

const getCategoryColor = (category: Todo["category"]) => {
  switch (category) {
    case "urgente":
      return "#DC2626";
    case "personnelle":
      return "#10B981";
    case "travail":
      return "#3B82F6";
    case "révision":
      return "#8B5CF6";
    default:
      return "#999";
  }
};

export default function TodoHistoryItem({ item, restoreTodo }: TodoHistoryItemProps) {
  return (
    <View style={styles.todoItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.todoText}>🗑 {item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <Text style={[styles.categoryLabel, { backgroundColor: getCategoryColor(item.category) }]}>
          {item.category}
        </Text>
      </View>

      <TouchableOpacity onPress={() => restoreTodo(item.id)} style={styles.restoreBtn}>
        <MaterialIcons name="restore" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 2,
  },
  categoryLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    textTransform: "capitalize",
  },
  restoreBtn: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 6,
    marginTop: 42,
  },
});
