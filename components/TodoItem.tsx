import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { showToast } from "../utils/feedback";
import { Todo } from "@/app/(tabs)/index";

interface TodoItemProps {
  item: Todo;
  updateStatus: (id: string, status: Todo["status"]) => void;
  deleteTodo: (id: string) => void;
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

export default function TodoItem({ item, updateStatus, deleteTodo }: TodoItemProps) {
  const handleDelete = () => {
    Alert.alert(
      "Supprimer la tâche",
      "Tu veux vraiment supprimer cette tâche ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            deleteTodo(item.id);
            showToast("Tâche supprimée 🗑️");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.todoItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.todoText}>Tâche : {item.text}</Text>
        <Text style={styles.timestamp}>Ajoutée le : {item.timestamp}</Text>
        <Text style={[styles.categoryLabel, { backgroundColor: getCategoryColor(item.category) }]}>
          {item.category}
        </Text>

        <Picker
          selectedValue={item.status}
          onValueChange={(value) => updateStatus(item.id, value)}
          style={styles.pickerInline}
        >
          <Picker.Item label="🟡 En cours" value="encours" />
          <Picker.Item label="✅ Terminée" value="terminée" />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
        <MaterialIcons name="backspace" size={20} color="#fff" />
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
  pickerInline: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    height: 50,
    marginTop: 5,
  },
  deleteBtn: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 6,
    marginTop: 70,
  },
});
